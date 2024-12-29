import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, Typography, Box } from '@mui/material';

export default function UserList({ onSelectUser, selectedUserId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <List sx={{ p: 0 }}>
      {users.map((user) => (
        <ListItem
          button
          key={user.id}
          onClick={() => onSelectUser(user)}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            bgcolor: selectedUserId === user.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
            '&:hover': {
              bgcolor: 'rgba(102, 126, 234, 0.05)',
            },
          }}
        >
          <ListItemAvatar>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: user.status === 'online' ? '#10B981' : '#6B7280',
                  border: '2px solid white',
                  width: 10,
                  height: 10,
                  borderRadius: '50%'
                }
              }}
            >
              <Avatar 
                src={user.photoURL} 
                alt={user.displayName}
                sx={{ width: 45, height: 45 }}
              />
            </Badge>
          </ListItemAvatar>
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle1" sx={{ color: '#2D3748', fontWeight: 500 }}>
              {user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#718096' }}>
              {user.status}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
} 