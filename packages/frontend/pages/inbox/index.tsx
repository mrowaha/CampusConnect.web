import React, { useEffect, useState } from 'react';

import { Container, Grid, Stack, Button, Box, Avatar, TextField, ListItemText, ListItem, ListItemAvatar, useTheme } from "@mui/material";
import { AddCircleOutlineOutlined as AddCircleOutlineIcon } from "@mui/icons-material";
import { Post } from "@/components/forum";
import { PageTitle } from "@/components/shared";
import SendIcon from '@mui/icons-material/Send';
import MessageComponent from "@/components/inbox/MessageComponent";
import MessageThreadComponent from "@/components/inbox/MessageThreadComponent";
import { IconSend } from "@tabler/icons-react";
import { BACKEND_URL, GET_MESSAGE_THREADS_BY_USER_ID, MARK_MESSAGES_AS_SEEN, SEND_MESSAGE } from "@/routes";
import { useSnackbar } from "@/store/snackbar";
import { useAtom } from "jotai";
import {currentUserAtom} from "@/auth";

// const loggedInUser = {
  //   id : "cbb2b18f-a7c4-49de-8a0c-2c0836d960f5"
  //   // id: "12363402-04ab-4819-8619-20ea0556507f"s
// }

interface Message {
  id: string;
  seen: boolean;
  timeStamp: number[];
  content: string;
  senderId: string;
  receiverId: string;
}

interface MessageThreadData {
  id: string;
  initiatingUser: User;
  receivingUser: User;
  messages: Message[];
}

interface User {
  userId: string;
  firstName: string;
  lastName: string;
}

export default function Inbox() {

  const [loggedInUser, setLoggedInUser] = useAtom(currentUserAtom);

  const theme = useTheme();
  const snackbar = useSnackbar();
  const [messageThreadList, setMessageThreadList] = useState([]); // State to hold the messageThreadList
  const [currentMessages, setCurrentMessages] = useState([]); // State to hold the messageThreadList
  const [currentChatUser, setCurrentChatUser] = useState({avatar : "/user-avatar.svg", name: "",id: "1", otherUserId:"2" });

  // State to hold the new message text
  const [newMessage, setNewMessage] = React.useState("");

  useEffect(() => {

    // Define a function to fetch message threads
    const fetchMessageThreads = (print) => {
      console.log("Websocket");
      console.log("user", loggedInUser?.firstName);
      getMessageThreads(loggedInUser.uuid, print, undefined);
    };
  
    // Initially, call the function
    fetchMessageThreads(true);
  
    const intervalId = setInterval(() => fetchMessageThreads(false), 5000);
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const getMessageThreads = async (userId: string, showSnack: boolean, currentThreadId:any) => {

    try {
      const res = await fetch(`${BACKEND_URL}${GET_MESSAGE_THREADS_BY_USER_ID}${userId}`, {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        },
      });
    
      //Message Thread Data saved and processed
      const data: MessageThreadData[] = await res.json();
      const messageThreads = mapDataToMessageThreads(data);
      setMessageThreadList(messageThreads)
      
      if (messageThreads.length > 0) {
          
          if (currentChatUser.id === "1"){
            console.log("Set first thread as default", currentChatUser)
            await updateCurrentMessages(messageThreads[0].message, showSnack, messageThreads[0])
          }
          else{

            const current = messageThreads.find(messageThread => messageThread.id === currentChatUser.id);
            console.log("Dont change me", current.name)

            // console.log("messageThreads[0].message", messageThreads[0].message)
            // console.log("current.messag", current.message)
            await updateCurrentMessages(current.message, showSnack, current)
          }
        // }

      }
      
      if (showSnack){
        snackbar("success", "Fetched message threads successfully");
      }

    } catch (err: unknown) {
      snackbar("error getMessageThreads", (err as Error).message);
    }
  } 

  const updateCurrentMessages = async (list, showSnack, selectedThreadUser) => {

    console.log("selectedThreadUser",selectedThreadUser)
    setCurrentChatUser(selectedThreadUser)

    console.log("currentChatUser", currentChatUser)

    //Mark as seen
    try {
      const res = await fetch(`${BACKEND_URL}${MARK_MESSAGES_AS_SEEN}${loggedInUser.uuid}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(list)
      })

      if (showSnack){
        snackbar("success", "Chat Loaded Successfully");
      }
    } catch (err: unknown) {
      snackbar("error", (err as Error).message);
    }

    setCurrentMessages(list)    
  };

  // Function to map the received data
  const mapDataToMessageThreads = (data: MessageThreadData[]) => {
    return data.map(thread => ({
      id: thread.id,
      otherUserId: thread.initiatingUser.userId === loggedInUser.uuid ? thread.receivingUser.userId : thread.initiatingUser.userId,
      name: `${thread.initiatingUser.firstName} ${thread.initiatingUser.lastName}`,
      avatar: thread.initiatingUser.profilePicture || '/user-avatar.svg',
      unreadCount: thread.messages.filter(message => message.receiverId === loggedInUser.uuid && !message.seen).length,
      message: thread.messages
        .map(message => ({
          id:message.id,
          content: message.content,
          sentTime: `${message.timeStamp[3].toString().padStart(2, '0')}:${message.timeStamp[4].toString().padStart(2, '0')}:${message.timeStamp[5].toString().padStart(2, '0')}`,
          seen: message.seen,
          isSender: message.senderId === loggedInUser.uuid,
        }))
    }));
  };

  // Function to handle sending a message
  const handleSendMessage = async () => {

    if (newMessage !== ""){

      try {
        const res = await fetch(`${BACKEND_URL}${SEND_MESSAGE}`, {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            content : newMessage,
            senderId : loggedInUser.uuid,
            receiverId : currentChatUser.otherUserId
          })
        })

        getMessageThreads(loggedInUser.uuid, false, currentChatUser.id)
        
        snackbar("success", "Message Sent Successfully");

      } catch (err: unknown) {
        snackbar("error", (err as Error).message);
      }

      setNewMessage('');

    }

  };

  const onSelectThread = async (selectedThreadUser) => {
    // Find the message thread with the matching ID
    const selectedThread = messageThreadList.find((thread) => thread.id === selectedThreadUser.id);

    // Check if the thread was found
    if (selectedThread) {
      await updateCurrentMessages(selectedThread.message, true, selectedThreadUser);
      console.log("messages are ", selectedThread.message );
    } else {
      console.warn(`Thread with ID "${selectedThreadUser.id}" not found!`);
    }
  };
  

  const threadHeader = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  };

  // CSS
  const outerthreadHeader = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '10px',
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '10px',
  };

  return (
    <Container style={{padding:"10px"}}>
    {/* Page Title */}
      <PageTitle pageTitle={"Inbox"} />

      <Grid container spacing={2} >

          {/* Right MessageThreads Grid */}
          <Grid item xs={4} style={{ height: "90vh", overflowY: "auto", border: `2px solid ${theme.palette.primary.light}`, borderRadius: '10px' }}>
                <MessageThreadComponent users={messageThreadList} onSelectThread={onSelectThread }/>
          </Grid>

          {/* Messages Grid */}
          <Grid item xs={8} style={{ height: "90vh", border: `2px solid ${theme.palette.primary.light}`, borderRadius: '10px', padding:"10px"}}>


            {/* Top User Name*/}
            
            <Box sx={outerthreadHeader}>
            <Box sx={threadHeader}>
            <ListItem button >
              <ListItemAvatar>
                <Avatar alt={currentChatUser.name} src={currentChatUser.avatar} />
              </ListItemAvatar>
              <ListItemText primary={currentChatUser.name} />
            </ListItem>
            </Box>
            </Box>

            <Grid style={{ height: "70vh", overflowY: "auto", width: "100%" }}>
              {(currentMessages != null && currentMessages.length > 0 && (
                <Grid container style={{ overflowY: "scroll", maxHeight: "100%", width: "100%" }}>
                  <Stack style={{ width: "100%" }}>
                    {currentMessages.map((message) => (
                      <MessageComponent
                        content={message.content}
                        time={message.sentTime}
                        seen={message.seen}
                        isSender={message.isSender}
                      />
                    ))}
                  </Stack>
                </Grid>
              ))}
            </Grid>

            

            {/* Message input area */}
            <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Type Your Message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                variant="contained"
                endIcon={<IconSend size={24} color="white"/>}
                onClick={handleSendMessage}
                sx={{ marginLeft: 1 }}
              >
                Send
              </Button>
            </Box>

          </Grid>
      </Grid>


    </Container>
  );
}

export async function getStaticProps() {
  return {
    props : {
      protected : true
    }
  }
}