import { Grid } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { mostrarMensajeError } from 'src/util/error-handling'
import { Snackbar, Alert } from '@mui/material'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { Loader } from '../Loader/Loader'
/* Llamada al componente y pasar por props la colección de info a mappear como card */

export const CardGrid = forwardRef((props, ref) => {
  const { data, hasButton, width, filter, onRefresh } = props
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const [datos, setDatos] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useImperativeHandle(ref, () => ({
    getDataChildren() {
      getData()
    },
  }))

  const getData = async () => {
    try {
      setLoading(true)
      const datosCards = await data.datosService(filter)
      setDatos(datosCards)
      setLoading(false)
      stackEntradas(datosCards)
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
      setLoading(false)
    }
  }

  const deleteCard = async (idDelShow, tipoUbicacion) => {
    try {
      console.log(tipoUbicacion)
      await data.deleteService(idDelShow, tipoUbicacion)
      await getData()
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  const stackEntradas = (entradas) => {
    console.log(entradas)
    const conteoEntradas = entradas.reduce((acc, show) =>{
      if(!acc[show.evento]){
        acc[show.evento] = show
        acc[show.evento].cantidad = 1
      }else{
        acc[show.evento].cantidad++
      }

      return acc
    }, {})

    const entradasStackeadas = Object.entries(conteoEntradas).map(([show, entrada]) => entrada)

    return entradasStackeadas
  }

  const entradasStackeadas = (entradas) => {
    return (<>
      {stackEntradas(entradas).map((item, index) => (
            <Grid
              item
              xs={8}
              md={width}
              key={index}
              deleteCard={deleteCard}
              onRefresh={onRefresh}
            >
              {data.component(item, hasButton, deleteCard, onRefresh)}
        </Grid>
      ))}
    </>)
  }

  useEffect(() => {
    getData()
  }, [location.pathname])

  const snackbarOpen = !!errorMessage

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            mt: 2,
          }}
        >
          {location.pathname == "/cart" ? entradasStackeadas(datos) : datos.map((item, index) => (
            <Grid
              item
              xs={8}
              md={width}
              key={index}
              deleteCard={deleteCard}
              onRefresh={onRefresh}
            >
              {data.component(item, hasButton, deleteCard, onRefresh)}
            </Grid>
          ))}
        </Grid>
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
    </>
  )
})
