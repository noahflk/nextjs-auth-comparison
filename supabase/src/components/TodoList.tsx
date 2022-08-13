import { trpc } from '@/utils/trpc';
import { Todo } from '@/components/Todo';

export const TodoList: React.FC = () => {
  const { data: todos, error } = trpc.useQuery(['todos.get-all']);

  if (error) return <p>Failed to load items.</p>;

  if (!todos) return <p>Loading...</p>;

  if (todos.length === 0) return <p>The list is empty. Add a new todo.</p>;

  return (
    <ul className="w-full max-w-lg space-y-4">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
