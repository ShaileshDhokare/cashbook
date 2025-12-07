import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUserLogin } from '@/services/authServices';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number')
    .regex(
      /(?=.*[@#$%&*?!=])/,
      'Password must contain at least one special character (@#$%&*?!=)'
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();

  const setSession = useAuthStore((state: any) => state.setSession);
  const setError = useAuthStore((state: any) => state.setError);
  const { mutate: login, isPending, isError, error } = useUserLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    login(data, {
      onSuccess: (data) => {
        setSession(data?.session);
        navigate('/dashboard');
      },
      onError: (error) => {
        setError(error);
      },
    });
    return;
  };

  return (
    <div className='min-h-screen'>
      <div className='flex mt-5 flex-col items-center justify-center min-h-screen bg-gray-50 px-4'>
        <Card className='w-full md:w-[350px] lg:w-[450px]'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold'>Login</CardTitle>
            <p className='text-gray-500 text-md mt-1'>
              Welcome back! Please enter your credentials
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  {...register('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p className='text-sm text-red-500'>{errors.email.message}</p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Enter your password'
                  {...register('password')}
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
                {errors.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700'
                disabled={!isValid}
              >
                {isPending ? (
                  <>
                    <Spinner />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </CardFooter>
          </form>
          <div className='text-center text-sm text-gray-600'>
            Don’t have an account?{' '}
            <Link to='/register' className='text-blue-600 hover:underline'>
              Register
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
