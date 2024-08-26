import { Alert, Avatar, Button, Snackbar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { Usuario } from 'src/domain/Usuario'
import { userService } from 'src/services/UserService'
import { mostrarMensajeError } from 'src/util/error-handling'

export const PerfilSide = () => {
  const [data, setData] = useState(new Usuario())
  const [recarga, setRecarga] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const snackbarOpen = !!errorMessage

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const info = await userService.getPerfilUsuario()
      setData(info)
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    if (
      (name === 'nombre' && /\d/.test(value)) ||
      (name === 'apellido' && /\d/.test(value))
    ) {
      return
    }
    setData({ ...data, [name]: value })
  }
  const handleRecargaChange = (e) => {
    setRecarga(e.target.value)
  }

  const handleDataSubmit = async (e) => {
    e.preventDefault()

    try {
      await userService.actualizarPerfilUsuario(data)
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  const handleCreditoSubmit = async (e) => {
    e.preventDefault()
    if (recarga < 0) {
      setErrorMessage('Por favor ingrese un numero valido.')
      return
    }
    try {
      await userService.agregarCredito(recarga)
      setData({ ...data, credito: data.credito + parseFloat(recarga) })
      setRecarga(0)
    } catch (error) {
      mostrarMensajeError(e, setErrorMessage)
    }
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleDataSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="porfile picture"
          src={data.imagen}
          sx={{ width: 100, height: 100 }}
          data-testid="imagen"
        />
        <TextField
          required
          id="outlined-required"
          label="Nombre"
          name="nombre"
          value={data.nombre}
          onChange={handleChange}
          variant="standard"
          data-testid="nombre"
        />
        <TextField
          required
          id="outlined-required"
          label="Apellido"
          name="apellido"
          value={data.apellido}
          onChange={handleChange}
          variant="standard"
          data-testid="apellido"
        />
        <TextField
          id="outlined-required"
          label="fecha de nacimiento"
          type="date"
          name="fechaDeNacimiento"
          InputLabelProps={{
            shrink: true,
          }}
          value={data.fechaDeNacimiento}
          onChange={handleChange}
          variant="standard"
          data-testid="fechaNacimiento"
        />
        <Typography textAlign="center" variant="h6"></Typography>
        <Button type="submit" data-testid="btn_guardar" variant="contained">
          Guardar cambios
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        component="form"
        onSubmit={handleCreditoSubmit}
      >
        <TextField
          id="outlined-required"
          label="Cantidad de credito a recargar"
          type="number"
          name="recarga"
          InputLabelProps={{
            shrink: true,
          }}
          value={recarga}
          onChange={handleRecargaChange}
          variant="standard"
          data-testid="recarga"
        />
        <Typography textAlign="center" data-testid="credito" variant="h6">
          {' '}
          {data.credito}
        </Typography>
        <Button type="submit" data-testid="btn_sumar" variant="contained">
          Sumar credito
        </Button>
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
    </Box>
  )
}
