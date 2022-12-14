import type { GetServerSideProps, NextPage } from 'next';

import { AddTodo } from '@/components/AddTodo';
import { TodoList } from '@/components/TodoList';
import { protectedRoute } from '@/utils/auth';

const Home: NextPage = () => {
  // const { signOut } = useAuth();

  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
      <div className="flex justify-end w-full p-2">
        <button className="font-medium">Sign Out</button>
      </div>
      <div className="flex flex-col items-center pt-8 gap-y-8">
        <h1 className="text-4xl font-medium">Clerk implementation</h1>
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return protectedRoute(req);
};

export default Home;
