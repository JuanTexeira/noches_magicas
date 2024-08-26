/* eslint-disable no-alert */
import { Alert, Grid, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { funcionService } from 'src/services/FuncionService'
import { CardEntrada } from '../cardEntrada/CardEntrada'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { userService } from 'src/services/UserService'
import { mostrarMensajeError } from 'src/util/error-handling'

const CarouselEntradas = (props) => {
  const [entradas, setEntradas] = useState(null)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const snackbarOpen = !!errorMessage
  const [severity, setSeverity] = useState('error')
  const [selectedCard, setSelectedCard] = useState(null)

  const getEntradas = async (id) => {

    try {
      const newEntradas = await funcionService.getEntradas(id)
      const mappedEntradas = newEntradas.map((entrada, index) => ({ ...entrada, cardId: index }))
      setEntradas(mappedEntradas)
      setSelectedCard(null)
    } catch (e) { mostrarMensajeError(e, setErrorMessage) }

  }
  const handleItemClick = (id) => {
    getEntradas(id)

  }

  const [entradasCarrito, setEntradasCarrito] = useState({})

  const handleEntradasCarrito = (entrada) => {
    setEntradasCarrito({ ...entradasCarrito, [entrada.id]: entrada })
  }

  const onHandleClick = async () => {
    if (props.data[0].soldout) {
      try {
        await funcionService.suscribirseAFuncion(location.pathname.split('/').pop())
        setErrorMessage("Suscrito Correctamete")
        setSeverity("success")
      } catch (e) {
        mostrarMensajeError(e, setErrorMessage)
      }
    } else {
      const formattedEntradas = Object.values(entradasCarrito).map(entrada => ({
        id: entrada.id,
        cantidad: entrada.cantidad,
        ubicacion: entrada.ubicacion
      }))
      try {
        await userService.agregarEntradasCarrito(formattedEntradas)
        navigate("/cart")
      } catch (e) {
        mostrarMensajeError(e, setErrorMessage)
      }
    }
  }
  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <div style={{ whiteSpace: 'nowrap', padding: 16 }}>
        <Grid container spacing={2} style={{ flexWrap: 'nowrap' }}>
          {props.data.map((element, index) =>
            < Grid item key={index} >
              <props.componente item={element} buttonFunctions={props.functions ? props.functions : null} handleClick={() => handleItemClick(element.id)}/>
            </Grid>
          )}
          <div style={{ width: '16px', flex: 'none' }}></div>
        </Grid>
      </div>
      {
        entradas &&
        <div>
          {entradas.map((element, index) =>
            <Grid item key={index} >
              <CardEntrada 
                entrada={element} 
                soldOut={props.data[0].soldout}
                onCantidadChange={handleEntradasCarrito}
                disabled={selectedCard !== null && selectedCard !== element.cardId}
                setSelectedCard={setSelectedCard} 
              />
            </Grid>
          )}
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button
              size="small"
              variant="contained"
              onClick={() => onHandleClick()}
              style={{ marginTop: '1rem' }}
            >
              {props.data[0].soldout ? "Avisarme de nueva función" : "Agregar al carrito"}
            </Button>
          </div>
        </div>
      }
      <Snackbar
        open={snackbarOpen}
        variant="error"
        autoHideDuration={1800}
        onClose={() => {
          setErrorMessage(false)
          setSeverity('error')
        }}
        style={{ marginBottom: '8rem', fontSize: '400rem' }}
      >
        <Alert severity={severity}>{errorMessage}</Alert>
      </Snackbar>
    </div >
  )
}

export default CarouselEntradas