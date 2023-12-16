import React, { useEffect, useState } from 'react';

import { Container, Grid, Stack, Button, Box, Fab, Avatar, ListItemText, ListItem, ListItemAvatar, useTheme, TextField, Tooltip } from "@mui/material";
import { PageTitle } from "@/components/shared";
import MessageComponent from "@/components/inbox/MessageComponent";
import MessageThreadComponent from "@/components/inbox/MessageThreadComponent";
import { IconSend, IconInbox } from "@tabler/icons-react";
import { BACKEND_URL, GET_MESSAGE_THREADS_BY_USER_ID, MARK_MESSAGES_AS_SEEN, SEND_MESSAGE } from "@/routes";
import { useSnackbar } from "@/store/snackbar";
import { useAtom } from "jotai";
import {currentUserAtom} from "@/auth";
import { useRouter } from 'next/router';
import {createPortal} from "react-dom";

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

  const router = useRouter();
  const { uuid, name } = router.query; // Get params from URL

  useEffect(() => {
    if (uuid && name) {
      const temp = { uuid, name };
      setChatWithUser(temp);
    }
  }, [uuid, name]);

  const [loggedInUser, setLoggedInUser] = useAtom(currentUserAtom);

  const theme = useTheme();
  const snackbar = useSnackbar();
  const [messageThreadList, setMessageThreadList] = useState([]); // State to hold the messageThreadList
  const [chatWithUser, setChatWithUser] = useState(undefined); // State to hold the messageThreadList
  // const [chatWithUser, setChatWithUser] = useState({uuid : "77ad7db6-bdf0-40bb-a459-0f46caf56dd2", name: "Ege"}); // State to hold the messageThreadList
  // const [chatWithUser, setChatWithUser] = useState({uuid : "12363402-04ab-4819-8619-20ea0556507f", name: "Deniz"}); // State to hold the messageThreadList
  const [currentMessageThread, setCurrentMessageThread] = useState({avatar : "/blank-profile-picture.webp", name: "No Existing Chat Found", id: "1", otherUserId:"2", message: [] });

  // State to hold the new message text
  const [newMessage, setNewMessage] = React.useState("");
  

  useEffect(() => {

    // Define a function to fetch message threads
    const fetchMessageThreads = (print) => {
      getMessageThreads(loggedInUser.uuid, print);
    };
  
    // Initially, call the function
    fetchMessageThreads(true);
  
    const intervalId = setInterval(() => fetchMessageThreads(false), 7000);
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
      if (messageThreadList.length > 0) {
              
          if (currentMessageThread.id === "1"){

            //came to inbox via some profile
            if (chatWithUser != undefined){    

                const availableThread = messageThreadList.find((thread) => thread.otherUserId === chatWithUser.uuid);

                if (availableThread !== undefined){   
                  setCurrentMessageThread(availableThread) 
                  markAsSeen(availableThread.message)
                }
                else{ 
                  const emptyThread = {avatar : "/blank-profile-picture.webp", name: chatWithUser.name, id: "2", otherUserId:chatWithUser.uuid, message: [] }
                  setCurrentMessageThread(emptyThread) 
                }
            }
            else{
              setCurrentMessageThread(messageThreadList[0]) 
              markAsSeen(messageThreadList[0].message)

            }
          }
          else{
            const current = messageThreadList.find(messageThread => messageThread.id === currentMessageThread.id || messageThread.name === currentMessageThread.name);

            if (current == undefined && currentMessageThread.id == "2"){
              const currentAgain = messageThreadList.find(messageThread => messageThread.name.includes(currentMessageThread.name));

              if (currentAgain == undefined){
                const emptyThread = {avatar : "/blank-profile-picture.webp", name: chatWithUser.name, id: "2", otherUserId:chatWithUser.uuid, message: [] }
                setCurrentMessageThread(emptyThread) 
              }
              else{
                setCurrentMessageThread(currentAgain) 
              }
            }
            else{
              setCurrentMessageThread(current) 
            }
          }

      }
  }, [messageThreadList]);

  const getMessageThreads = async (userId: string, showSnack: boolean) => {

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

      if (showSnack){
        snackbar("success", "Fetched message threads successfully");
      }

    } catch (err: unknown) {
      snackbar("error", (err as Error).message);
    }
  } 

  const markAsSeen = async (list) => {

    //Mark as seen
    try {
      const res = await fetch(`${BACKEND_URL}${MARK_MESSAGES_AS_SEEN}${loggedInUser.uuid}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(list)
      })

    } catch (err: unknown) {
      snackbar("error", (err as Error).message);
    }
  };

  // Function to map the received data
  const mapDataToMessageThreads = (data: MessageThreadData[]) => {
    return data.map(thread => ({
      id: thread.id,
      otherUserId: thread.initiatingUser.userId === loggedInUser.uuid ? thread.receivingUser.userId : thread.initiatingUser.userId,
      name: thread.initiatingUser.userId === loggedInUser.uuid ? `${thread.receivingUser.firstName} ${thread.receivingUser.lastName}` : `${thread.initiatingUser.firstName} ${thread.initiatingUser.lastName}`,
      avatar: '/blank-profile-picture.webp',
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
            receiverId : currentMessageThread.otherUserId
          })
        })

        setNewMessage('');
        snackbar("success", "Message Sent Successfully");

        getMessageThreads(loggedInUser.uuid, false)

      } catch (err: unknown) {
        snackbar("error", (err as Error).message);
      }

      
    }
  };

  const onSelectThread = async (selectedThreadUser) => {
    // Find the message thread with the matching ID
    const selectedThread = messageThreadList.find((thread) => thread.id === selectedThreadUser.id);

    // Check if the thread was found
    if (selectedThread) {

      setCurrentMessageThread(selectedThreadUser) 
      markAsSeen(selectedThreadUser.message)

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
    <>
        {
      createPortal(
        <Fab 
          color="primary"
          sx={{
            position : "absolute",
            right : 25,
            bottom : 25
          }}
          onClick={() => router.replace("/profile")}
        >
          <Tooltip title="Inbox" arrow>
            <IconInbox color='white'/>
          </Tooltip>
        </Fab>,
        document.getElementById("fab-div") as HTMLElement
      )
    }
    <Container style={{padding:"10px"}}>
    {/* Page Title */}
      <PageTitle pageTitle={"Inbox"} />

      <Grid container spacing={2} style={{ marginTop: "5px"}}>

          {/* Right MessageThreads Grid */}
          <Grid item xs={4} style={{ 
                height: "75vh", 
                overflowY: "auto", 
                borderRight: `2px solid ${theme.palette.primary.light}`
            }}>
                <MessageThreadComponent users={messageThreadList} onSelectThread={onSelectThread }/>
          </Grid>

          {/* Messages Grid */}

          {currentMessageThread && (
          <Grid item xs={8} style={{ height: "90vh", borderRadius: '10px', padding:"10px"}}>
 
            {/* Top User Name*/}
            
            <Box sx={outerthreadHeader} style={{ maxHeight: '10%' }}>
            <Box sx={threadHeader}>
                
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar alt={currentMessageThread.name} src={currentMessageThread.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={currentMessageThread.name} />
                    </ListItem>
               
            </Box>
            </Box>

            <Grid style={{ height: '70%', overflowY: "auto", width: "100%" }}>
              {(currentMessageThread.message != null && currentMessageThread.message.length > 0 && (
                <Grid container style={{ overflowY: "scroll", maxHeight: "100%", width: "100%" }}>
                  <Stack style={{ width: "100%" }}>
                    {currentMessageThread.message.map((message) => (
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
            {(currentMessageThread.id !== "1" &&

            (<Box sx={{ maxHeight: '20%', marginTop: 2, display: 'flex', alignItems: 'center' }}>
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
            </Box>)
            )}
          </Grid>
           )}
      </Grid>


    </Container>
    </>
  );
}

export async function getStaticProps() {
  return {
    props : {
      protected : true
    }
  }
}