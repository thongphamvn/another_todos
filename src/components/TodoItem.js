import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import TodoContext from '../context/todo';
import TodoEdit from './TodoEdit';

function TodoItem({ item }) {
  const [isEdit, setIsEdit] = useState(false);
  const {
    handleEdit: onEdit,
    handleDelete: onDelete,
    toggleArchive,
  } = useContext(TodoContext);

  const handleEdit = (value) => {
    onEdit(item.id, value);
    setIsEdit(false);
  };

  const content = isEdit ? (
    <TodoEdit
      item={item}
      onCancel={() => setIsEdit(false)}
      onSubmit={handleEdit}
    />
  ) : (
    <>
      <IconButton onClick={() => toggleArchive(item.id)}>
        <ArchiveOutlinedIcon color='success' />
      </IconButton>

      <Typography
        sx={item.isArchived ? { textDecoration: 'line-through' } : {}}
        flexGrow={1}
        variant='body1'
        marginX={1}
      >
        {item.title}
      </Typography>

      <Box display={'flex'}>
        <IconButton onClick={() => setIsEdit(true)}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => onDelete(item.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );

  return (
    <Paper
      sx={{ padding: 1.5, marginY: 1, display: 'flex', alignItems: 'center' }}
      variant='elevation'
      elevation={2}
    >
      {content}
    </Paper>
  );
}

export default TodoItem;
