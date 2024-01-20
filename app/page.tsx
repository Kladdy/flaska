'use client';
import IndexComponent from '@/components/IndexComponent';
import LoadingDots from '@/components/LoadingDots';
import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from 'next/navigation';

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <LoadingDots />;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <IndexComponent
        user={user} 
      />
    );
  }

  redirect('/api/auth/login');
}