import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  Box,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
} from '@mui/material'
import './cardTemplate.css'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import { mostrarMensajeError } from 'src/util/error-handling'
import { userService } from 'src/services/UserService'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { showService } from 'src/services/ShowService'
import { Badge, styled } from '@mui/material'

export default function MediaCard({
  item,
  hasButton,
  esEntrada,
  puedeCalificar,
  esBorrable,
  deleteCard,
  onRefresh,
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40em',
    height: '20em',
    padding: '3em',
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '.5em',
    borderRadius: '1em',
  }
  const StyledBadge = styled(Badge)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(3),
    zIndex: 1,
    '& .MuiBadge-badge': {
      fontSize: '2.5rem',
      padding: '0.5em',
    },
  }))
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [mensaje, setMensaje] = useState('')
  const [calificacion, setCalificacion] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')
  const esAdmin = () => localStorage.getItem('usuAdm') == 'true'
  const handleComentar = async (mensaje, calificacion) => {
    try {
      const comentario = await userService.comentarShow(
        item.id,
        mensaje,
        calificacion,
      )

      navigate('/perfil/comentarios')
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      await deleteCard(item.idDelShow, item.tipoUbicacion)
      onRefresh()
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  const handleMensaje = (event) => {
    setMensaje(event.target.value)
  }

  const handleCalificacion = (event) => {
    setCalificacion(event.target.value)
  }

  const handleClick = async (id) => {
    await showService.logClick(id)
    navigate(`/detalleShow/${id}`)
  }

  const ContenidoCard = () => (
    <Card
      sx={{
        minWidth: '300px',
        minHeight: '470px',
        border: '.2em solid #1129',
        ...(!esEntrada && {
          '&:hover': {
            backgroundColor: '#ccc',
          },
        }),
        position: 'relative',
      }}
    >
      {esBorrable && (
        <StyledBadge badgeContent={item.cantidad} color="primary"></StyledBadge>
      )}
      <CardMedia
        sx={{ height: 300, objectFit: 'scale-down' }}
        image={item.imagen}
        title="foto de la banda"
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: '2',
          pb: '0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography data-testid="banda-evento">{`${item.banda} - ${item.evento}`}</Typography>

          <Typography>
            <StarRoundedIcon /> {`${item.rateFixed} (${item.cantComentarios})`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography>
            {`Ubicacion: ${item.nombreInstalacion ? item.nombreInstalacion : item.ubicacion}`}
          </Typography>

          {esEntrada ? (
            <Typography data-testid="fecha">{`Fecha: `}</Typography>
          ) : (
            <Typography data-testid="fechas">{'Fechas: '}</Typography>
          )}
          {item.detalleFunciones?.map((funcion, index) => (
            <Typography key={index}>
              {dayjs(funcion.fecha).format('DD/MM')}
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {item.amigosQueAsisten && item.amigosQueAsisten.length > 0 ? (
            <Typography>También van a asistir:</Typography>
          ) : (
            <Typography>No asisten amigos</Typography>
          )}
          <AvatarGroup max={3}>
            {item.amigosQueAsisten?.map((amigo) => (
              <Avatar
                alt={`${amigo.nombre} ${amigo.apellido}`}
                src={amigo.imagen}
                key={amigo.id}
              />
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Typography data-testid="precio">
          {esEntrada
            ? `Precio: $${item.precioFixed}`
            : `Desde: $${item.precioMin} a $${item.precioMax}`}
        </Typography>

        {hasButton && !esAdmin() ? (
          <div>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleClick(item.id)}
            >
              Comprar
            </Button>
          </div>
        ) : (
          <></>
        )}
        {esBorrable ? (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon style={{ color: 'red', fontSize: '30px' }} />
          </IconButton>
        ) : (
          <></>
        )}
        {puedeCalificar ? (
          <Button
            size="small"
            variant="contained"
            onClick={(e) => {
              e.preventDefault()
              handleOpen()
            }}
            data-testid="boton-calificar"
          >
            Calificar
          </Button>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  )

  return (
    <Box>
      {!esEntrada ? (
        <Link
          to={`/detalleShow/${item.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ContenidoCard />
        </Link>
      ) : (
        <>
          <ContenidoCard />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => {
                e.preventDefault()
                handleClose()
                handleComentar(mensaje, calificacion)
              }}
              style={style}
            >
              <InputLabel
                gutterBottom
                htmlFor="calificacion"
                sx={{ alignSelf: 'flex-start' }}
              >
                Calificación
              </InputLabel>
              <TextField
                variant="outlined"
                id="calificacion"
                type="number"
                value={calificacion}
                onChange={handleCalificacion}
                placeholder="Calificación..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StarIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1, max: 5 },
                }}
                sx={{ width: '100%' }}
              />
              <InputLabel htmlFor="mensaje" sx={{ alignSelf: 'flex-start' }}>
                Comentario
              </InputLabel>
              <TextField
                variant="outlined"
                id="mensaje"
                type="text"
                multiline
                rows={4}
                value={mensaje}
                onChange={handleMensaje}
                placeholder="Comentario..."
                sx={{ width: '100%' }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Calificar
              </Button>
            </form>
          </Modal>
        </>
      )}
    </Box>
  )
}
