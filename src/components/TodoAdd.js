import { Button, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

function TodoAdd({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    onSubmit(value);
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
