import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    if (!accessToken) {
      // Redirect to log in if accessToken is not available
      router.push('/login');
    }
  }, [accessToken, router]);

  // Render children if authenticated
  return accessToken ? <>{children}</> : null;
};

export default AuthGuard;
