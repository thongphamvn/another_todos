import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedHidden, setCompletedHidden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3005/todos');

      setTodos(data);
    };
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

  const remainList = todos.filter((todo) => !todo.isArchived);
  const completedCount = todos.length - remainList.length;

  return (
    <div>
      <Container maxWidth={'sm'} sx={{ marginTop: 5 }}>
        <TodoAdd onSubmit={handleAdd} />
        <Box sx={{ mt: 2 }}>
          <Button
            variant='text'
            onClick={() => setCompletedHidden(!completedHidden)}
          >
            <Typography variant='body2'>
              {completedHidden
                ? `Show Completed (${completedCount})`
                : `Hide completed (${completedCount})`}
            </Typography>
          </Button>
        </Box>
        <TodoList
          onDelete={handleDelete}
          toggleArchive={toggleArchive}
          todos={completedHidden ? remainList : todos}
          onEdit={handleEdit}
        />
      </Container>
    </div>
  );
}

export default App;
