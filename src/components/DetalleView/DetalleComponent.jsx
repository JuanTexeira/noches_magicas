import LocationOnIcon from '@mui/icons-material/LocationOn'
import CardFecha from 'src/components/cardFecha/cardFecha'
import Carousel from 'src/components/carousel/carousel'
import Comment from 'src/components/comment/Comment'
import { Snackbar, Alert } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box, Container } from '@mui/material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import CarouselEntradas from '../carouselEntradas/CarouselEntradas'
import EstadisticasDetalladas from '../estadisticasDetalladas/EstadisticasDetalladas'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { adminService } from 'src/services/AdministradorService'
import { useState } from 'react'

export const DetalleComponent = ({ datos, showComments }) => {
  const location = useLocation()
  const [idShow, setIdShow] = useState()
  const esAdmin = () => localStorage.getItem('usuAdm') == 'true'
  const [kpi, setKpi] = useState({})

  const getIdShow = () => {
    return location.pathname.split('/').pop()
  }

  const getEstadisticas = async () => {
    try {
      const idShowActual = getIdShow()
      const idAdmin = Number(localStorage.getItem('usuId'))
      const kpiShow = await adminService.getKpiShow(idShowActual, idAdmin)
      setKpi(kpiShow)
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  useEffect(() => {
    if (esAdmin()) {
      getEstadisticas()
    }
  }, [location.pathname])

  useEffect(() => {
    setIdShow(Number(getIdShow()))
  }, [kpi])

  return (
    <Container className="main">
      <Box sx={{ mb: '1em' }}>
        <Typography
          variant="h4"
          noWrap
          sx={{
            mr: 2,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {datos.banda} - {datos.evento}
        </Typography>
        <Typography
          variant="h5"
          noWrap
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '.1em',
            mr: 2,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <LocationOnIcon />
          <Box sx={{ fontWeight: 'bold' }} data-testid="ubicacion">
            {datos.instalacion.nombre}
          </Box>
          ({datos.instalacion.coordenadaX}° {datos.instalacion.coordenadaY}°)
        </Typography>
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
            gap: '.2em',
          }}
        >
          <StarRoundedIcon />
          <Box sx={{ fontWeight: 'bold' }}>{datos.rateFixed} Puntos</Box>-
          {datos.cantComentarios} opiniones
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '2em', flexWrap: 'nowrap' }}>
        <img src={datos.imagen} alt={datos.banda} width="600" height="400" />
        <Box sx={{ display: 'flex', gap: '2em', flexWrap: 'wrap' }}>
          {esAdmin() ? (
            <Carousel
              data={datos.detalleFunciones}
              componente={CardFecha}
              options={idShow}
              puedeCrear={kpi.puedoCrearFuncion}
            />
          ) : (
            <CarouselEntradas
              data={datos.detalleFunciones}
              componente={CardFecha}
            />
          )}
          {Object.keys(kpi).length ? (
            <EstadisticasDetalladas estadisticas={kpi} />
          ) : (
            ''
          )}
        </Box>
      </Box>

      {showComments && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: 4, // Espacio entre cada comentario
          }}
        >
          {datos.listaComentarios.map((comentario, index) => (
            <Comment item={comentario} hasButton={false} key={index} />
          ))}
        </Box>
      )}
    </Container>
  )
}
