import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Box, Icon } from '@mui/material'

export default function Comment({ item, hasButton, deleteCard }) {
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
              <Typography variant="h6">{item.calificacion}</Typography>
              <Icon aria-label="rate">
                <StarRoundedIcon />
              </Icon>
              {hasButton ? (
                <IconButton aria-label="delete" onClick={handleClick}>
                  <DeleteIcon />
                </IconButton>
              ) : (
                <></>
              )}
            </Box>
          </>
        }
        title={item.nombre}
        subheader={item.fecha}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.mensaje}
        </Typography>
      </CardContent>
    </Card>
  )
}
