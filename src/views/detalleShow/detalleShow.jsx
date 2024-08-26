import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { mostrarMensajeError } from 'src/util/error-handling'
import { CardEntrada } from 'src/components/cardEntrada/CardEntrada'
import { showService } from 'src/services/ShowService'
import { Show } from 'src/domain/show'
import { DetalleComponent } from 'src/components/DetalleView/DetalleComponent'
import { Snackbar, Alert } from '@mui/material'

export default function DetalleShow() {
  const location = useLocation()
  const [datos, setDatos] = useState(new Show())
  const [errorMessage, setErrorMessage] = useState('')

  const getData = async () => {
    try {
      const idShow = location.pathname.split('/').pop()
      const datosShows = await showService.getById(idShow)
      setDatos(datosShows)
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  useEffect(() => {
    getData()
  }, [location.pathname])

  const snackbarOpen = !!errorMessage

  return (
    <>
      <DetalleComponent datos={datos} showComments={true}></DetalleComponent>
      <Snackbar
        open={snackbarOpen}
        variant="error"
        autoHideDuration={1800}
        onClose={() => setErrorMessage(false)}
        style={{ marginBottom: '8rem', fontSize: '400rem' }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  )
}
