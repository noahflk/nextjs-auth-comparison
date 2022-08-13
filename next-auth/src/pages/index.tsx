import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';

import { AddTodo } from '@/components/AddTodo';
import { TodoList } from '@/components/TodoList';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        <p>Access Denied</p> <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
      <div className="flex justify-end w-full p-2">
        <button className="font-medium" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
      <div className="flex flex-col items-center pt-8 gap-y-8">
        <h1 className="text-4xl font-medium">Clerk implementation</h1>
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
