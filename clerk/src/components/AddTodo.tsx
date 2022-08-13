import { useState } from 'react';
import toast from 'react-hot-toast';

import { trpc } from '@/utils/trpc';
import { Todo } from '@prisma/client';

export const AddTodo: React.FC = () => {
  const [value, setValue] = useState('');
  const client = trpc.useContext();

  const { mutate } = trpc.useMutation('todos.create', {
    onMutate: async ({ name }) => {
      setValue('');

      await client.cancelQuery(['todos.get-all']);

      const previousTodos = client.getQueryData(['todos.get-all']);

      client.setQueryData(['todos.get-all'], (old) => [
        ...(old ?? []),
        { name, done: false, id: Math.floor(Math.random() * 1000) } as Todo,
      ]);

      return { previousTodos: previousTodos ?? [] };
    },
    onError: (error, newTodo, context) => {
      toast.error('Failed to add a new todo');
      setValue(newTodo.name);

      if (context) {
        client.setQueryData(['todos.get-all'], context.previousTodos);
      }
    },
    onSettled: () => {
      client.invalidateQueries('todos.get-all');
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (value !== '') {
          mutate({ name: value });
        }
      }}
      className="flex w-full max-w-lg space-x-4 "
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        type="text"
        className="flex-1 px-4 py-3 bg-transparent border-2 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 border-fuchsia-600"
        placeholder="Add a todo"
      />
      <button type="submit" className="h-full p-4 font-semibold rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500">
        Add
      </button>
    </form>
  );
};
