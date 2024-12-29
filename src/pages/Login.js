import { Button, Container, Paper, Typography, Box } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import ChatIcon from '@mui/icons-material/Chat';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <ChatIcon
              sx={{
                fontSize: 60,
                color: '#667eea',
                p: 1,
                borderRadius: '50%',
                background: 'rgba(102, 126, 234, 0.1)',
              }}
            />
          </Box>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#2d3748',
              mb: 3,
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#718096',
              mb: 4,
            }}
          >
            Connect with friends and start chatting instantly
          </Typography>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 500,
              background: 'linear-gradient(to right, #667eea, #764ba2)',
              '&:hover': {
                background: 'linear-gradient(to right, #5a6fd6, #6a439c)',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Continue with Google
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 4,
              color: '#718096',
              fontSize: '0.875rem',
            }}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
} 