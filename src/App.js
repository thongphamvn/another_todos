import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedHidden, setCompletedHidden] = useState(false);
  const handleAdd = (title) => {
    const newTodo = { id: new Date().getTime(), title, isArchived: false };
    setTodos([newTodo, ...todos]);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleArchive = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, isArchived: !t.isArchived } : t))
    );
  };

  const handleEdit = (id, title) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, title } : t)));
  };

  const finalList = completedHidden
    ? todos.filter((todo) => !todo.isArchived)
    : todos;
  const completedCount = todos.length - finalList.length;

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
          todos={finalList}
          onEdit={handleEdit}
        />
      </Container>
    </div>
  );
}

export default App;
