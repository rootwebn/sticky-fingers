import { is } from '@babel/types';
import { GetServerSideProps } from 'next';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export const getContextType = () => ({ 'Context-Type': 'application/json' });

export const catchError = (err: any): string => {
  const message = err?.response?.data?.message;

  return message
    ? typeof err.response.data.message === 'object'
      ? message[0]
      : message
    : message.error;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const isValid = await validateAccessToken(accessToken);

  if (!isValid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // If the token is valid, render the page with any necessary props
  return {
    props: {}, // Pass any props required by the page component
  };
};

async function validateAccessToken(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL} + '/access-token'`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.ok; // Return true if token is valid
  } catch (error) {
    return false; // Return false if token validation fails
  }
}
