import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { CircularProgress, Box } from '@mui/material';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              status: 'online',
              lastSeen: new Date()
            });
          } else {
            await setDoc(userRef, {
              status: 'online',
              lastSeen: new Date()
            }, { merge: true });
          }

          const unsubscribeSnapshot = onSnapshot(userRef, (doc) => {
            setCurrentUser({ ...user, ...doc.data() });
          });

          return () => unsubscribeSnapshot();
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'error.main'
      }}>
        Error: {error}
      </Box>
    );
  }

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 