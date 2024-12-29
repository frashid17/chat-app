import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, addDoc, serverTimestamp, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Box, TextField, IconButton, Paper, Typography, Avatar, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Chat({ recipientId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!recipientId || !currentUser) return;

    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', [currentUser.uid, recipientId].sort().join('_')),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = [];
      snapshot.forEach((doc) => {
        messageList.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messageList);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [recipientId, currentUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const chatId = [currentUser.uid, recipientId].sort().join('_');
      
      const messageData = {
        text: newMessage,
        senderId: currentUser.uid,
        recipientId: recipientId,
        chatId: chatId,
        timestamp: serverTimestamp(),
        senderName: currentUser.displayName,
        senderPhoto: currentUser.photoURL
      };

      await addDoc(collection(db, 'messages'), messageData);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.paper',
      transition: 'background-color 0.3s ease'
    }}>
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto',
        p: 3,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: theme.palette.mode === 'light' ? '#f1f1f1' : '#2d2d4a',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === 'light' ? '#888' : '#4a4a6a',
          borderRadius: '3px',
          '&:hover': {
            background: theme.palette.mode === 'light' ? '#666' : '#5a5a7a',
          },
        },
      }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.senderId === currentUser.uid ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            {message.senderId !== currentUser.uid && (
              <Avatar
                src={message.senderPhoto}
                sx={{ 
                  width: 32, 
                  height: 32, 
                  mr: 1,
                  border: 1,
                  borderColor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'
                }}
              />
            )}
            <Box
              sx={{
                maxWidth: '70%',
                p: 2,
                bgcolor: message.senderId === currentUser.uid 
                  ? 'primary.main'
                  : theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
                color: message.senderId === currentUser.uid 
                  ? 'white'
                  : 'text.primary',
                borderRadius: message.senderId === currentUser.uid 
                  ? '20px 20px 0 20px'
                  : '20px 20px 20px 0',
                boxShadow: theme.palette.mode === 'light'
                  ? '0 2px 5px rgba(0,0,0,0.05)'
                  : '0 2px 5px rgba(0,0,0,0.2)',
              }}
            >
              <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                {message.text}
              </Typography>
              {message.timestamp && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    mt: 0.5,
                    color: message.senderId === currentUser.uid 
                      ? 'rgba(255,255,255,0.7)'
                      : 'text.secondary',
                    fontSize: '0.75rem'
                  }}
                >
                  {message.timestamp.toDate().toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </Typography>
              )}
            </Box>
            {message.senderId === currentUser.uid && (
              <Avatar
                src={message.senderPhoto}
                sx={{ 
                  width: 32, 
                  height: 32, 
                  ml: 1,
                  border: 1,
                  borderColor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'
                }}
              />
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
        <Paper
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            p: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '30px',
            bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
            border: 1,
            borderColor: 'divider',
          }}
        >
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: 'text.primary',
                '&::placeholder': {
                  color: 'text.secondary',
                },
              }
            }}
            sx={{ mx: 1 }}
          />
          <IconButton 
            type="submit" 
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              width: 40,
              height: 40,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                bgcolor: 'primary.dark',
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
} 