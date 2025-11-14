import { Header } from '@/components/content/Header';
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
import Footer from '@/components/content/Footer';

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(3, 'First name is required')
      .max(14, 'First name is too long'),
    lastName: z
      .string()
      .min(3, 'Last name is required')
      .max(14, 'Last name is too long'),
    email: z.string().email('Invalid email address'),
    username: z
      .string()
      .min(3, 'Username is required')
      .max(14, 'Username is too long')
      .regex(
        /^[A-Za-z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      ),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /(?=.*[A-Z])/,
        'Password must contain at least one uppercase letter'
      )
      .regex(/(?=.*\d)/, 'Password must contain at least one number')
      .regex(
        /(?=.*[@#$%&*?!=])/,
        'Password must contain at least one special character (@#$%&*?!=)'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log('form data -->', data);
  };

  return (
    <div className='min-h-screen'>
      <Header />
      <div className='flex mt-5 flex-col items-center justify-center min-h-screen bg-gray-50 px-4'>
        <Card className='w-full md:w-[350px] lg:w-[450px]'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold'>
              Create an Account
            </CardTitle>
            <p className='text-gray-500 text-md mt-1'>
              Welcome! Please enter your details to create an account
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>Firstname</Label>
                <Input
                  id='firstName'
                  type='text'
                  placeholder='Enter your firstname'
                  {...register('firstName')}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                />
                {errors.firstName && (
                  <p className='text-sm text-red-500'>
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lastName'>Lastname</Label>
                <Input
                  id='lastName'
                  type='text'
                  placeholder='Enter your lastname'
                  {...register('lastName')}
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                />
                {errors.lastName && (
                  <p className='text-sm text-red-500'>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
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
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  placeholder='Enter your username'
                  {...register('username')}
                  aria-invalid={errors.username ? 'true' : 'false'}
                />
                <p className='text-xs text-gray-500'>
                  Username can only contain letters, numbers, and underscores.
                </p>
                {errors.username && (
                  <p className='text-sm text-red-500'>
                    {errors.username.message}
                  </p>
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
                <p className='text-xs text-gray-500'>
                  Password must contain at least one uppercase letter, one
                  number, and one special character form(@#$%&*?!=).
                </p>
                {errors.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='Enter your password'
                  {...register('confirmPassword')}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                />
                {errors.confirmPassword && (
                  <p className='text-sm text-red-500'>
                    {errors.confirmPassword.message}
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
                Register
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
