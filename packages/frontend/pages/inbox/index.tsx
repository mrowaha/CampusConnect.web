import React from "react";

import { Container, Grid, Stack, Button, Box, Avatar, TextField, ListItemText, ListItem, ListItemAvatar, useTheme } from "@mui/material";
import { AddCircleOutlineOutlined as AddCircleOutlineIcon } from "@mui/icons-material";
import { Post } from "@/components/forum";
import { PageTitle } from "@/components/shared";
import SendIcon from '@mui/icons-material/Send';
import MessageComponent from "@/components/inbox/MessageComponent";
import MessageThreadComponent from "@/components/inbox/MessageThreadComponent";
import { IconSend } from "@tabler/icons-react";




export default function Inbox() {

  const theme = useTheme();

    // State to hold the new message text
    const [newMessage, setNewMessage] = React.useState("");

    // Function to handle sending a message
    const handleSendMessage = () => {
      console.log("Message to send:", newMessage);
      // Add logic to send message here
      setNewMessage(""); // Clear the input field after sending a message
    };
    
  const messageList = React.useMemo(() => [
    {
      id: 1,
      content: "Hey, are you selling a copy of the Epic of Gilgamesh by any chance? I'm really interested in reading it.",
      seen: true,
      isSender: false,
      sentTime: "13:20 PM",
    },
    {
      id: 2,
      content: "Hi! Yes, I have a copy I'd be willing to part with. Are you looking for a specific edition or condition?",
      seen: true,
      isSender: true,
      sentTime: "13:20 PM",
    },
    {
      id: 3,
      content: "Hey, are you selling a copy of the Epic of Gilgamesh by any chance? I'm really interested in reading it.",
      seen: true,
      isSender: false,
      sentTime: "13:20 PM",
    },
    {
      id: 4,
      content: "Hi! Yes, I have a copy I'd be willing to part with. Are you looking for a specific edition or condition?",
      seen: true,
      isSender: true,
      sentTime: "13:20 PM",
    },
    {
      id: 5,
      content: "Hi! Yes, I have a copy I'd be willing to part with. Are you looking for a specific edition or condition?",
      seen: false,
      isSender: true,
      sentTime: "13:20 PM",
    },
    {
      id: 3,
      content: "Hey, are you selling a copy of the Epic of Gilgamesh by any chance? I'm really interested in reading it.",
      seen: true,
      isSender: false,
      sentTime: "13:20 PM",
    },
    {
      id: 4,
      content: "Hi! Yes, I have a copy I'd be willing to part with. Are you looking for a specific edition or condition?",
      seen: true,
      isSender: true,
      sentTime: "13:20 PM",
    },
    {
      id: 5,
      content: "Hi! Yes, I have a copy I'd be willing to part with. Are you looking for a specific edition or condition?",
      seen: false,
      isSender: true,
      sentTime: "13:20 PM",
    },
  ], []);

  const user = {
    profilePicture : "/user-avatar.svg",
    firstName: "Ather",
    lastName: "ilyas"

  }

  const userThreadList = React.useMemo(() => [
    {
      name: "Ather",
      id:" 12312-312",
      avatar: "/user-avatar.svg", // URL to the user's avatar image
      isModeration: false,
      unreadCount: 0
    },
    {
      name: "Rowaha",
      id:" 12312-372",
      avatar: "/user2-avatar.svg", // URL to the user's avatar image
      isModeration: true,
      unreadCount: 3
    },
    {
      name: "Mehshid",
      id:" 12372-3121",
      avatar: "/user-avatar.svg", // URL to the user's avatar image
      isModeration: false,
      unreadCount: 1
    },
    {
      name: "Ismail",
      id:" 12372-3122",
      avatar: "/user-avatar.svg", // URL to the user's avatar image
      isModeration: false,
      unreadCount: 1
    },
    {
      name: "Ghulam",
      id:" 12372-3123",
      avatar: "/user-avatar.svg", // URL to the user's avatar image
      isModeration: false,
      unreadCount: 1
    },
  ], []);

  const threadHeader = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // alignItems:  'flex-start',
    // margin: '10px',
    // backgroundColor: theme.palette.secondary.light,
    // borderRadius: '10px',
  };

  const outerthreadHeader = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '10px',
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '10px',
  };

  return (
    <Container style={{ border: "2px solid black", maxHeight:"100%"}}>
    {/* Page Title */}
      <PageTitle pageTitle={"Inbox"} />

      <Grid container spacing={2}>

          {/* Right MessageThreads Grid */}
          <Grid item xs={4}>
                <MessageThreadComponent users={userThreadList}/>
          </Grid>

          {/* Messages Grid */}
          <Grid item xs={8}>


            {/* Top User Name*/}
            
            <Box sx={outerthreadHeader}>
            <Box sx={threadHeader}>
            <ListItem button >
              <ListItemAvatar>
                <Avatar alt={user.firstName} src={user.profilePicture} />
              </ListItemAvatar>
              <ListItemText primary={user.firstName + " " + user.lastName } />
            </ListItem>
            </Box>
            </Box>


            <Grid >
              <Grid container style={{overflowY : "scroll"}}>
              {messageList.map((message) => (
                <Grid item key={message.id} xs={12}>
                  <MessageComponent
                    content={message.content}
                    time={message.sentTime}
                    seen={message.seen}
                    isSender={message.isSender}
                  />
                </Grid>
              ))}

              </Grid>

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
