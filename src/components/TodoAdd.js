import { Button, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import TodoContext from '../context/todo';

function TodoAdd() {
  const [value, setValue] = useState('');
  const { handleAdd } = useContext(TodoContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    handleAdd(value);
    setValue('');
  };

  const handleKeyUp = (e) => {
    if (e.code === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Paper>
      <Box display={'flex'}>
        <TextField
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          value={value}
          fullWidth
          id='outlined-basic'
          label='Add Todo'
          variant='outlined'
        />
        <Button onClick={handleSubmit} variant='contained'>
          Submit
        </Button>
      </Box>
    </Paper>
  );
}

export default TodoAdd;
