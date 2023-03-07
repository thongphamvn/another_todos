import TodoItem from './TodoItem';

function TodoList({ todos }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo}></TodoItem>
      ))}
    </div>
  );
}

export default TodoList;
