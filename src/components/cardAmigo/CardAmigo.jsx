import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { red } from '@mui/material/colors'

export const CardAmigo = ({ item, hasButton, deleteCard, agregar = false }) => {
  const handleClick = (event) => {
    event.preventDefault()
    deleteCard(item.id)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            alt={item.nombre}
            src={item.imagen}
          />
        }
        action={
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton aria-label="icon" onClick={handleClick}>
                {agregar ? <PersonAddIcon /> : <DeleteIcon /> }
              </IconButton>
            </Box>
          </>
        }
        title={`${item.nombre} ${item.apellido}`}
      />
    </Card>
  )
}
