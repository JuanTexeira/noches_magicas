import { Grid, Tab, Tabs } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import { PerfilSide } from '../perfilSide/PerfilSide'
import { useState } from 'react'

export const PerfilLayout = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Grid container spacing={2} className="main">
        <Grid item xs={3}>
          <PerfilSide />
        </Grid>
        <Grid item xs={9}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab
              component={Link}
              to="/perfil/entradas"
              label="Entradas compradas"
              data-testid="entradasTab"
            />
            <Tab
              component={Link}
              to="/perfil/amigos"
              data-testid="amigosTab"
              label="Amigos"
            />
            <Tab
              component={Link}
              to="/perfil/comentarios"
              label="Comentarios"
              data-testid="comentariosTab"
            />
            <Tab
              component={Link}
              to="/perfil/sugerencias"
              label="amigos recomendados"
              data-testid="sugerenciasTab"
            />
          </Tabs>
          <Outlet />
        </Grid>
      </Grid>
    </>
  )
}

PerfilLayout.propTypes = {}
