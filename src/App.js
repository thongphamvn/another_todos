import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';
import TodoContext from './context/todo';

function App() {
  const [completedHidden, setCompletedHidden] = useState(false);
  const { todos } = useContext(TodoContext);

  const remainList = todos.filter((todo) => !todo.isArchived);
  const completedCount = todos.length - remainList.length;

  return (
    <div>
      <Container maxWidth={'sm'} sx={{ marginTop: 5 }}>
        <TodoAdd />
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
        <TodoList todos={completedHidden ? remainList : todos} />
      </Container>
    </div>
  );
}

export default App;
