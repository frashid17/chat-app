import { useState, useContext } from 'react';
import { Grid, Paper, Box, AppBar, Toolbar, Typography, Avatar, IconButton, InputBase, useTheme } from '@mui/material';
import UserList from '../components/UserList';
import Chat from '../components/Chat';
import { useAuth } from '../contexts/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { auth } from '../firebase';
import { ColorModeContext } from '../contexts/ColorModeContext';

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser } = useAuth();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.default',
      transition: 'background-color 0.3s ease'
    }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          <Avatar 
            src={currentUser?.photoURL} 
            sx={{ 
              width: 40, 
              height: 40, 
              mr: 2,
              border: 2,
              borderColor: 'primary.main'
            }}
          />
          <Typography variant="h6" sx={{ color: 'text.primary', flexGrow: 1 }}>
            {currentUser?.displayName}
          </Typography>
          <IconButton onClick={colorMode.toggleColorMode} sx={{ mr: 1 }}>
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <IconButton onClick={handleLogout} color="primary">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Grid item xs={12} sm={4} md={3} 
          sx={{ 
            borderRight: 1, 
            borderColor: 'divider',
            height: '100%',
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper
              elevation={0}
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                border: 1,
                borderColor: 'divider',
              }}
            >
              <IconButton sx={{ p: '10px', color: 'text.secondary' }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, color: 'text.primary' }}
                placeholder="Search conversations"
              />
            </Paper>

            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.mode === 'light' ? '#f1f1f1' : '#2d2d4a',
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme.palette.mode === 'light' ? '#888' : '#4a4a6a',
                borderRadius: '4px',
              },
            }}>
              <UserList 
                onSelectUser={setSelectedUser} 
                selectedUserId={selectedUser?.id}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={9} sx={{ height: '100%' }}>
          {selectedUser ? (
            <Chat recipientId={selectedUser.id} />
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                textAlign: 'center',
                bgcolor: 'background.paper'
              }}
            >
              <Box
                component="img"
                src={theme.palette.mode === 'light' 
                  ? "https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
                  : "https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
                }
                alt="Select Chat"
                sx={{ 
                  width: 150,
                  height: 150,
                  mb: 3,
                  opacity: 0.5,
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
                }}
              />
              <Typography variant="h5" sx={{ color: 'text.primary', mb: 1, fontWeight: 600 }}>
                Welcome to Chat App
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Select a conversation or start a new one
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
} 