'use client';

import { useLoginMutation } from '@/shared/api/authApi';
import { useSchemes } from '@/shared/schemes/formScheme';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import dynamic from 'next/dynamic';

const LoginPage = () => {
  const { LoginOnSubmit, LoginForm } = useSchemes();

  return (
    <div className={'mx-16 my-4 flex justify-center items-center'}>
      <Card className={'min-w-96'}>
        <CardHeader>Login Page</CardHeader>
        <CardContent>
          <Form {...LoginForm}>
            <form
              onSubmit={LoginForm.handleSubmit(LoginOnSubmit)}
              className="space-y-8"
            >
              <FormField
                control={LoginForm.control}
                name="emailInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="whatthefuck@root.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={LoginForm.control}
                name="passwordInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Login</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
