'use client';
import EntryComponent from '@/components/EntryComponent';
import LoadingDots from '@/components/LoadingDots';
import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from 'next/navigation';

export default function Entry() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <LoadingDots fullHeight={true} />;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <EntryComponent
        user={user} 
      />
    );
  }

  redirect('/api/auth/login');
}