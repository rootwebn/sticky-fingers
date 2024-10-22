import { useLoginMutation } from '@/shared/api/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useSchemes = () => {
  const [login] = useLoginMutation();

  const loginScheme = z.object({
    emailInput: z.string(),
    passwordInput: z.string().min(8).includes('_'),
  });

  const LoginOnSubmit = async (value: z.infer<typeof loginScheme>) => {
    try {
      const response = await login({
        email: value.emailInput,
        password: value.passwordInput,
      }).unwrap();

      const { accessToken, refreshToken } = response.data;

      Cookies.set('accessToken', accessToken, { expires: 1, path: '/' });
      Cookies.set('refreshToken', refreshToken, { expires: 7, path: '/' });

      toast.success('Login successfully');
    } catch (err) {
      toast.error('error');
    }
  };

  const LoginForm = useForm<z.infer<typeof loginScheme>>({
    resolver: zodResolver(loginScheme),
    defaultValues: useMemo(
      () => ({
        emailInput: '',
        passwordInput: '',
      }),
      [],
    ),
  });

  return {
    LoginOnSubmit,
    LoginForm,
  };
};
