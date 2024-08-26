import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import StadiumOutlinedIcon from '@mui/icons-material/StadiumOutlined'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar' //
import Menu from '@mui/material/Menu'
import { useNavigate } from 'react-router-dom'
import { userService } from 'src/services/UserService'
import { Usuario } from 'src/domain/Usuario'
import { useState, useEffect } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { mostrarMensajeError } from 'src/util/error-handling'

const pages = ['Shows', 'Cart']
const pagesAdmin = ['Shows']

function Navbar() {
  const esAdmin = () => localStorage.getItem('usuAdm')
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [dataLow, setDataLow] = useState(new Usuario())
  const [errorMessage, setErrorMessage] = useState('')
  const snackbarOpen = !!errorMessage

  const getLowData = async () => {
    if (esAdmin() == null) {
      return
    }
    try {
      const lowData = await userService.getLowData()
      setDataLow(lowData)
    } catch (e) {
      mostrarMensajeError(e, setErrorMessage)
    }
  }

  useEffect(() => {
    getLowData()
  }, [])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (link) => {
    setAnchorElUser(null)
    navigate(link)
  }

  const logOut = () => {
    localStorage.removeItem('usuId')
    localStorage.removeItem('usuAdm')

    navigate('/')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              textDecoration: 'none',
            }}
            component={Link}
            to="/shows"
            variant="h6"
          >
            <StadiumOutlinedIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NOCHES-MÁGICAS
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(esAdmin() == 'true' ? pagesAdmin : pages).map((page) => (
              <Button
                key={page}
                component={Link}
                to={`${page.toLowerCase()}`}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* user menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {esAdmin() && (
                  <Typography sx={{ mr: 1, fontSize: '1.3rem' }}>
                    {dataLow.nombre.toUpperCase()}{' '}
                    {dataLow.apellido.toUpperCase()}
                  </Typography>
                )}
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  data-testid="boton-avatar"
                >
                  <Avatar
                    alt="Avatar"
                    src={
                      esAdmin() ? dataLow.imagen : '/static/images/avatar/2.jpg'
                    }
                  />
                </IconButton>
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {esAdmin() == 'false' && (
                <MenuItem
                  onClick={() => handleCloseUserMenu('/perfil/entradas')}
                >
                  <Typography textAlign="center" data-testid="profile">
                    Profile
                  </Typography>
                </MenuItem>
              )}
              {esAdmin() == 'true' && (
                <MenuItem onClick={() => handleCloseUserMenu('/admin')}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              )}
              <MenuItem onClick={() => logOut()}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Snackbar
        open={snackbarOpen}
        variant="error"
        autoHideDuration={1800}
        onClose={() => setErrorMessage(false)}
        style={{ marginBottom: '8rem', fontSize: '400rem' }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </AppBar>
  )
}
export default Navbar
