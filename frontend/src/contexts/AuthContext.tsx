import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth,
  db 
} from '../config/firebase';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signUpWithEmail: (email: string, password: string, userData: any) => Promise<User | null>;
  resendVerificationEmail: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  signInWithEmail: async () => null,
  signUpWithEmail: async () => null,
  resendVerificationEmail: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        throw new Error('Por favor verifica tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.');
      }
      return result.user;
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('No existe una cuenta con este correo electrónico');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Contraseña incorrecta');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('El correo electrónico no es válido');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('Esta cuenta ha sido deshabilitada');
      }
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, userData: any) => {
    try {
      // Primero creamos el usuario en Firebase Auth
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      try {
        // Luego intentamos crear el documento en Firestore
        const userDocRef = doc(db, 'users', result.user.uid);
        await setDoc(userDocRef, {
          ...userData,
          email: result.user.email,
          emailVerified: false,
          isEntrepreneur: false,
          points: 0,
          tags: [],
          causesCreated: 0,
          causesSupported: 0,
          productsCreated: 0,
          createdAt: new Date().toISOString(),
        });

        // Enviamos el email de verificación
        const actionCodeSettings = {
          url: `${window.location.origin}/login?email=${email}`,
          handleCodeInApp: true,
        };

        await sendEmailVerification(result.user, actionCodeSettings);
        
        // Cerramos sesión después del registro para forzar la verificación
        await signOut(auth);

        return result.user;
      } catch (firestoreError) {
        // Si falla la creación del documento, eliminamos el usuario de Auth
        console.error('Error creating Firestore document:', firestoreError);
        await result.user.delete();
        throw new Error('Error al crear el perfil de usuario. Por favor intenta de nuevo.');
      }
    } catch (error: any) {
      console.error('Error in signUpWithEmail:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Este correo electrónico ya está registrado');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('El correo electrónico no es válido');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('El registro con correo electrónico no está habilitado');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      throw error;
    }
  };

  const resendVerificationEmail = async () => {
    if (currentUser && !currentUser.emailVerified) {
      await sendEmailVerification(currentUser);
    }
  };

  const logout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        if (user.emailVerified) {
          try {
            // Si el usuario está verificado, actualizamos sus puntos
            const userDoc = doc(db, 'users', user.uid);
            await setDoc(userDoc, {
              emailVerified: true,
              points: 100,
            }, { merge: true });
          } catch (error) {
            console.error('Error updating user points:', error);
          }
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithEmail,
    signUpWithEmail,
    resendVerificationEmail,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
