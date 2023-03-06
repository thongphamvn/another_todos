import CancelButton from '@mui/icons-material/CancelOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import { IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

function TodoEdit({ item, onSubmit, onCancel }) {
  const [value, setValue] = useState(item.title);

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    onSubmit(value);
  };

  return (
    <>
      <Box width={'100%'} display={'flex'}>
        <TextField
          autoFocus
          onChange={(event) => setValue(event.target.value)}
          value={value}
          fullWidth
          id='outlined-basic'
          variant='outlined'
          size='small'
        />
        <Box display={'flex'}>
          <IconButton onClick={handleSubmit}>
            <SendOutlined />
          </IconButton>

          <IconButton onClick={onCancel}>
            <CancelButton />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default TodoEdit;
