import { Navigate, useNavigate } from 'react-router-dom'
import { CardGrid } from 'src/components/cardGrid/cardGrid'
import {
  Container,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { mostrarMensajeError } from 'src/util/error-handling'
import { useLocation } from 'react-router-dom'

export const Cart = ({ data }) => {
  const [filtro, setFiltro] = useState({})
  const [datos, setDatos] = useState({ data: 0 })
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const [showCardGrid, setShowCardGrid] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  const handleClear = async () => {
    await data.clearService()
    setShowCardGrid(false)
    setDatos({ data: 0 })
  }

  const getData = async () => {
    try {
      const total = await data.totalCarritoService()
      setDatos(total)
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  const handleRefresh = async () => {
    getData()
  }

  const handleComprar = async () => {
    setConfirmationDialogOpen(true)
  }

  const handleConfirmationDialogClose = async (confirmed) => {
    setConfirmationDialogOpen(false)
    if (confirmed) {
      try {
        await data.comprarService()
        navigate('/perfil/entradas')
      } catch (error) {
        mostrarMensajeError(error, setErrorMessage)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [location.pathname])

  const snackbarOpen = !!errorMessage

  return (
    <Container className="main" data-testid="Carrito">
      <Typography
        variant="h4"
        noWrap
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          letterSpacing: '.1rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        SHOPPING CART
      </Typography>

      {datos.data === 0 ?
        <Typography variant="h6">
          Aún no hay nada aquí, agregue un show a su carrito
        </Typography>
        :
        showCardGrid &&
        <CardGrid
          data={data}
          hasButton={false}
          width={3.5}
          filter={filtro}
          onRefresh={handleRefresh}
        />

      }

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          mt: 3,
        }}
      >
        <Typography variant="h6">Total $ {datos.data.toFixed(2)}</Typography>
        <Box sx={{ display: 'flex', gap: '.2em', mt: 1 }}>
          <Button
            data-testid='BTN-comprar'
            size="medium"
            variant="contained"
            color="success"
            onClick={handleComprar}
          >
            Confirmar pedido
          </Button>
          <Button
            data-testid='BTN-clear'
            size="medium"
            variant="contained"
            color="secondary"
            onClick={handleClear}
          >
            Limpiar carrito
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        variant="error"
        autoHideDuration={1800}
        onClose={() => setErrorMessage(false)}
        style={{ marginBottom: '8rem', fontSize: '400rem' }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      <Dialog
        data-testid='PUP-confirmar'
        open={confirmationDialogOpen}
        onClose={() => handleConfirmationDialogClose(false)}
      >
        <DialogTitle>Confirmar Pedido</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas confirmar este pedido?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmationDialogClose(true)} autoFocus>
            Sí
          </Button>
          <Button onClick={() => handleConfirmationDialogClose(false)}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
