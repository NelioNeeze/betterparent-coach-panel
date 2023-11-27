import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isAuthenticated } from '../services/authService';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      router.push('/courses');
    }

  }, []);

  return null; 
};

export default Index;
