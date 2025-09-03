import { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext';

export const useLoginScreen = () => {
    const { signIn } = useAuth();  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleLogin = async () => {
      try {
        setLoading(true);
        setError('');
        await signIn({ email, password });
      } catch (err) {
        setError('Email ou senha inválidos');
      } finally {
        setLoading(false);
      }
    };
  
    return {
        email, 
        password, 
        setEmail, 
        setPassword, 
        loading, 
        error, 
        handleLogin
    };
};
