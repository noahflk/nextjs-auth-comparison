import { Todo as TodoModel } from '@prisma/client';
import toast from 'react-hot-toast';

import { trpc } from '@/utils/trpc';
import { TrashIcon } from '@/components/Icons';

export const Todo: React.FC<{ todo: TodoModel }> = ({ todo }) => {
  const client = trpc.useContext();

  const setTodoStatus = trpc.useMutation('todos.set-status', {
    onMutate: async (newTodo) => {
      await client.cancelQuery(['todos.get-all']);

      const previousTodos = client.getQueryData(['todos.get-all']);

      client.setQueryData(['todos.get-all'], (old) => {
        if (!old) return [];

        return old.map((todo) => {
          if (todo.id === newTodo.id) {
            return { ...todo, done: newTodo.done };
          }

          return todo;
        });
      });

      return { previousTodos: previousTodos ?? [] };
    },
    onError: (error, newTodo, context) => {
      toast.error('Failed to update todo status');

      if (context) {
        client.setQueryData(['todos.get-all'], context.previousTodos);
      }
    },
    onSettled: () => {
      client.invalidateQueries('todos.get-all');
    },
  });

  const deleteTodo = trpc.useMutation('todos.delete', {
    onMutate: async (deletedTodo) => {
      await client.cancelQuery(['todos.get-all']);
      const previousTodos = client.getQueryData(['todos.get-all']);

      client.setQueryData(['todos.get-all'], (old) => {
        if (!old) return [];

        return old.filter((todo) => {
          if (todo.id === deletedTodo.id) return false;

          return true;
        });
      });

      return { previousTodos: previousTodos ?? [] };
    },
    onError: (error, newTodo, context) => {
      toast.error('Failed to delete todo');

      if (context) {
        client.setQueryData(['todos.get-all'], context.previousTodos);
      }
    },
    onSettled: () => {
      client.invalidateQueries('todos.get-all');
    },
  });

  return (
    <li className="flex justify-between w-full p-4 py-3 bg-gray-800 rounded-lg gap-x-4">
      <div className="flex items-center truncate gap-x-4">
        <input
          id="offers"
          aria-describedby="offers-description"
          name="offers"
          type="checkbox"
          checked={todo.done}
          onChange={() => setTodoStatus.mutate({ id: todo.id, done: !todo.done })}
          className="w-6 h-6 bg-transparent border-2 rounded-full cursor-pointer focus:border-fuchsia-500 text-fuchsia-600 border-fuchsia-600"
        />
        <p className="truncate">{todo.name}</p>
      </div>
      <button onClick={() => deleteTodo.mutate({ id: todo.id })}>
        <TrashIcon />
      </button>
    </li>
  );
};
