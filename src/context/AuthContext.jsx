import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, isDemoMode } from '../config/firebase';
import { ADMIN_UID, DEMO_ADMIN_UID, DEMO_PARENT_UID } from '../utils/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      // Check if user previously logged in via Demo Mode in localStorage
      const savedDemoUser = localStorage.getItem('painting_demo_user');
      if (savedDemoUser) {
        try {
          setUser(JSON.parse(savedDemoUser));
        } catch (e) {
          localStorage.removeItem('painting_demo_user');
        }
      }
      setLoading(false);
      return;
    }

    // Live Firebase Auth listener
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Secure verification: strictly check UID
        const isAdminUser = firebaseUser.uid === ADMIN_UID;

        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || 'Studio Member',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          role: isAdminUser ? 'admin' : 'parent',
          isDemo: false,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ---- Live Google OAuth Login ---- */
  const loginWithGoogle = async () => {
    if (isDemoMode) {
      // If VITE keys are not provided, trigger demo parent login by default
      loginAsDemoParent();
      return;
    }

    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      const firebaseUser = res.user;
      // Secure verification: strictly check UID
      const isAdminUser = firebaseUser.uid === ADMIN_UID;

      const userData = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || 'Studio Member',
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        role: isAdminUser ? 'admin' : 'parent',
        isDemo: false,
      };
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* ---- Demo Admin Login (For immediate local testing) ---- */
  const loginAsDemoAdmin = () => {
    const demoAdmin = {
      uid: DEMO_ADMIN_UID,
      displayName: 'Priyanka (Studio Artist)',
      email: 'admin@paintingstudio.art',
      photoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      role: 'admin',
      isDemo: true,
    };
    localStorage.setItem('painting_demo_user', JSON.stringify(demoAdmin));
    setUser(demoAdmin);
    return demoAdmin;
  };

  /* ---- Demo Parent Login (For immediate local testing) ---- */
  const loginAsDemoParent = () => {
    const demoParent = {
      uid: DEMO_PARENT_UID,
      displayName: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      role: 'parent',
      isDemo: true,
      children: [
        { id: 'child-1', name: 'Aarav Sharma', age: 8, registeredClasses: ['watercolor-basics'] },
      ],
    };
    localStorage.setItem('painting_demo_user', JSON.stringify(demoParent));
    setUser(demoParent);
    return demoParent;
  };

  /* ---- Logout ---- */
  const logout = async () => {
    if (isDemoMode || user?.isDemo) {
      localStorage.removeItem('painting_demo_user');
      setUser(null);
      return;
    }

    try {
      if (auth) {
        await signOut(auth);
      }
      setUser(null);
    } catch (error) {
      console.error('Sign-Out Error:', error);
    }
  };

  const isAdmin = user?.role === 'admin' || user?.uid === ADMIN_UID || user?.uid === DEMO_ADMIN_UID;
  const isParent = !!user && !isAdmin;

  const value = {
    user,
    loading,
    isAdmin,
    isParent,
    isDemoMode,
    loginWithGoogle,
    loginAsDemoAdmin,
    loginAsDemoParent,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
