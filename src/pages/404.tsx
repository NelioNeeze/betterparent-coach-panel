import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if(token) {
      router.push("/courses")
    } else {
      router.push("/login")
    }

  }, []);

  return null; 
};

export default NotFound;
