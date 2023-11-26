import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isAuthenticated } from '../services/authService';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthWrapper;
