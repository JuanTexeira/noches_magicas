import { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  InputAdornment,
  InputLabel,
  Alert,
  Snackbar,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import BadgeIcon from '@mui/icons-material/Badge'
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone'
import { useNavigate } from 'react-router-dom'
import authService from 'src/services/AuthService'
import { mostrarMensajeError } from 'src/util/error-handling'

export const LoginView = () => {
  const [signup, setSignup] = useState({
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: new Date(),
  })
  /* const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') */
  const [signin, setsignin] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const snackbarOpen = !!errorMessage
  const navigate = useNavigate()

  const iniciarSesion = async () => {
    try {
      if (!signup.username || !signup.password) {
        setErrorMessage('Por favor, complete todos los campos')
        return
      }
      const usuario = await authService.validarUsuario(
        signup.username,
        signup.password,
      )

      localStorage.setItem('usuId', usuario.id.toString())
      localStorage.setItem('usuAdm', usuario.administrador.toString())

      // console.log(usuario.administrador)
      if(usuario.administrador){
        navigate('/admin')
      }else{
        navigate('/shows')
      }
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  const registrarse = async () => {
    try {
      if (
        !signup.username ||
        !signup.password ||
        !signup.nombre ||
        !signup.apellido ||
        !signup.fechaNacimiento
      ) {
        setErrorMessage('Por favor, complete todos los campos')
        return
      }
      const usuarioId = await authService.registrarUsuario(signup)
      localStorage.setItem('usuId', usuarioId.id.toString())
      localStorage.setItem('usuAdm', usuarioId.administrador.toString())
      navigate('/shows')
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  const handleSwap = () => {
    setSignup((prevState) => ({
      ...prevState,
      nombre: '',
      apellido: '',
      fechaNacimiento: new Date(),
    }))
    setsignin(!signin)
  }

  const handleChange = (e, field) => {
    setSignup({ ...signup, [field]: e.target.value })
  }

  return (
    <Container maxWidth="xs" className="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Noches Magicas
        </Typography>
        {signin ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              iniciarSesion()
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <InputLabel
              gutterBottom
              htmlFor="username"
              sx={{ alignSelf: 'flex-start' }}
            >
              Usuario
            </InputLabel>
            <TextField
              variant="outlined"
              id="username"
              type="text"
              value={signup.username}
              onChange={(e) => handleChange(e, 'username')}
              placeholder="Usuario"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%' }}
            />
            <InputLabel htmlFor="password" sx={{ alignSelf: 'flex-start' }}>
              Contraseña
            </InputLabel>
            <TextField
              variant="outlined"
              id="password"
              type="password"
              value={signup.password}
              onChange={(e) => handleChange(e, 'password')}
              placeholder="Contraseña"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%' }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>

            <Typography>
              No tienes cuenta?{' '}
              <Box
                onClick={handleSwap}
                sx={{ display: 'inline', color: '#538dbd', cursor: 'pointer' }}
              >
                Registrate aqui!
              </Box>
            </Typography>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              registrarse()
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <InputLabel
              gutterBottom
              htmlFor="username"
              sx={{ alignSelf: 'flex-start' }}
            >
              Usuario
            </InputLabel>
            <TextField
              variant="outlined"
              id="username"
              type="text"
              value={signup.username}
              onChange={(e) => handleChange(e, 'username')}
              placeholder="Usuario"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%' }}
            />
            <InputLabel htmlFor="password" sx={{ alignSelf: 'flex-start' }}>
              Contraseña
            </InputLabel>
            <TextField
              variant="outlined"
              id="password"
              type="password"
              value={signup.password}
              onChange={(e) => handleChange(e, 'password')}
              placeholder="Contraseña"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%' }}
            />
            <InputLabel
              gutterBottom
              htmlFor="nombre"
              sx={{ alignSelf: 'flex-start' }}
            >
              Nombre
            </InputLabel>
            <TextField
              variant="outlined"
              id="nombre"
              type="text"
              value={signup.nombre}
              onChange={(e) => handleChange(e, 'nombre')}
              placeholder="Nombre"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%' }}
            />

            <InputLabel
              gutterBottom
              htmlFor="apellido"
              sx={{ alignSelf: 'flex-start' }}
            >
              Apellido
            </InputLabel>
            <TextField
              variant="outlined"
              id="apellido"
              type="text"
              value={signup.apellido}
              onChange={(e) => handleChange(e, 'apellido')}
              placeholder="Apellido"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%' }}
            />

            <InputLabel
              gutterBottom
              htmlFor="fechaNacimiento"
              sx={{ alignSelf: 'flex-start' }}
            >
              Fecha de nacimiento
            </InputLabel>
            <TextField
              variant="outlined"
              id="fechaNacimiento"
              type="date"
              value={signup.fechaNacimiento}
              onChange={(e) => handleChange(e, 'fechaNacimiento')}
              sx={{ width: '100%' }}
            />

            <Button type="submit" variant="contained" color="primary">
              Registrarse
            </Button>

            <Typography>
              Ya tienes cuenta?{' '}
              <Box
                onClick={handleSwap}
                sx={{
                  display: 'inline',
                  color: '#538dbd',
                  cursor: 'pointer',
                }}
              >
                Ingresa aqui!
              </Box>
            </Typography>
          </form>
        )}
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
    </Container>
  )
}
