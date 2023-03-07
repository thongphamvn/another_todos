import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const TodoContext = createContext();

function Provider({ children }) {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get('http://localhost:3005/todos');
    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (title) => {
    const { data } = await axios.post('http://localhost:3005/todos', {
      title,
      isArchived: false,
    });

    setTodos([data, ...todos]);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3005/todos/${id}`);

    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleArchive = async (id) => {
    const todo = todos.find((t) => t.id === id);
    await axios.put(`http://localhost:3005/todos/${id}`, {
      ...todo,
      isArchived: !todo.isArchived,
    });

    setTodos(
      todos.map((t) => (t.id === id ? { ...t, isArchived: !t.isArchived } : t))
    );
  };

  const handleEdit = async (id, title) => {
    const todo = todos.find((t) => t.id === id);
    await axios.put(`http://localhost:3005/todos/${id}`, {
      ...todo,
      title: title,
    });
    setTodos(todos.map((t) => (t.id === id ? { ...t, title } : t)));
  };

  const value = { todos, handleAdd, handleDelete, handleEdit, toggleArchive };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { Provider };
export default TodoContext;
