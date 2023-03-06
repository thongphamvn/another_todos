import TodoItem from './TodoItem';

function TodoList({ todos, toggleArchive, onDelete, onEdit }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          toggleArchive={toggleArchive}
          onDelete={onDelete}
          onEdit={onEdit}
          key={todo.id}
          item={todo}
        ></TodoItem>
      ))}
    </div>
  );
}

export default TodoList;
