import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, company?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  listUsers: () => Promise<User[]>;
  setUserRole: (uid: string, role: 'user' | 'admin') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchUserProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: uid,
    name: data.name || '',
    email: data.email || '',
    company: data.company || '',
    phone: data.phone || '',
    address: data.address || '',
    role: data.role === 'admin' ? 'admin' : 'user',
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const profile = await fetchUserProfile(fbUser.uid);
        if (profile) {
          setUser(profile);
        } else {
          // Auth exists but no profile yet; build a minimal one
          setUser({
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email || '',
            email: fbUser.email || '',
            role: 'user',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const profile = await fetchUserProfile(cred.user.uid);
    if (profile) {
      setUser(profile);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, company = '') => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    const newUser: User = {
      id: cred.user.uid,
      name,
      email,
      company,
      role: 'user',
    };

    await setDoc(doc(db, 'users', cred.user.uid), {
      ...newUser,
      createdAt: new Date().toISOString(),
    });

    setUser(newUser);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setFirebaseUser(null);
  }, []);

  const listUsers = useCallback(async (): Promise<User[]> => {
    const q = query(collection(db, 'users'), where('role', '==', 'user'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name || '',
        email: data.email || '',
        company: data.company || '',
        phone: data.phone || '',
        address: data.address || '',
        role: data.role === 'admin' ? 'admin' : 'user',
      };
    });
  }, []);

  const setUserRole = useCallback(async (uid: string, role: 'user' | 'admin') => {
    await updateDoc(doc(db, 'users', uid), { role });
    if (user?.id === uid) {
      setUser((prev) => (prev ? { ...prev, role } : prev));
    }
  }, [user?.id]);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        login,
        register,
        logout,
        isAdmin,
        listUsers,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
