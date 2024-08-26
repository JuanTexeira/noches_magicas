import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import ModalCrearFecha from '../modalCrearFecha/ModalCrearFecha'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import ModalCrearShow from '../modalCrearShow/ModalCrearShow'

const Carousel = (props) => {
  const [elementos, setElementos] = useState(props.data || [])
  const [open, setOpen] = useState(false)
  const [openCrearShow, setOpenCrearShow] = useState(false)
  const [idShow, setIdShow] = useState(props.options || null)
  
  const esAdmin = () => localStorage.getItem('usuAdm') === 'true'

  const cerrarModal = () => {
    setOpen(false)
  }

  const abrirModal = () => {
    setOpen(true)
  }

  const abrirModalCrearShow = () => {
    setOpenCrearShow(true)
  }

  const mostrarAgregarFecha = () => {
    return elementos[0]?.fecha != null && esAdmin() && props.puedeCrear
  }

  const mostrarCrearShow = () => {
    return esAdmin() && elementos[0]?.evento != null
  }

  const actualizarElementos = (nuevoElemento) => {
    const nuevosElementos = [...elementos, nuevoElemento]
    setElementos(nuevosElementos)
  }

  const actualizadorDeElementos = {
    id: props.options,
    actualizarElementos: actualizarElementos,
  }

  const esShowNuevo = () => {
    return elementos.length === 0
  }

  useEffect(() => {
    setElementos(props.data)
  }, [props.data])


  return (
    <>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ whiteSpace: 'nowrap', padding: 16 }}>
          <Grid container spacing={2} style={{ flexWrap: 'nowrap' }}>
            {Array.isArray(elementos) &&
              elementos.map((element, index) => (
                <Grid item key={index}>
                  <props.componente
                    item={element}
                    buttonFunctions={props.functions ? props.functions : null}
                    options={props.options ? props.options : null}
                    isSelected={props.selectedCard === element.id}
                  />
                </Grid>
              ))}
            {mostrarAgregarFecha() || esShowNuevo() && (
              <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <IconButton onClick={() => abrirModal()}>
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              </Grid>
            )}

            {mostrarCrearShow() && (
              <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <IconButton onClick={() => abrirModalCrearShow()}>
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              </Grid>
            )}
            <div style={{ width: '16px', flex: 'none' }}></div>
          </Grid>
        </div>
      </div>
      <ModalCrearFecha
        open={open}
        handleClose={cerrarModal}
        idShow={props.options ? props.options : null}
        actualizadorElementos={actualizadorDeElementos}
      />
      <ModalCrearShow
        open={openCrearShow}
        handleClose={() => setOpenCrearShow(false)}
      />
    </>
  )
}

export default Carousel
