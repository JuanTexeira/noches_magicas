
import { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { Select , MenuItem, TextField } from "@mui/material"
import FormControl from '@mui/material/FormControl'
import { Alert, Snackbar } from '@mui/material'
import { ESTADOS_SHOW } from '../../util/EstadosShow.js'
import "./styles.css"


const ModalEstadoShow = ({ actualizarEstado, estadoActualShow, nombreActualShow, handleClose, open, estadosShow, handleChange }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40em',
        height: 'auto',
        padding: '3em',
        backgroundColor: '#fff',
        border: '2px solid #000',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: '.5em',
        borderRadius: '1em',
    }
  const [estadoShow, setEstadoShow] = useState(estadoActualShow)
  const [nombreShow, setNombreShow] = useState(nombreActualShow)
    const [errorMessage, setErrorMessage] = useState('')
    const snackbarOpen = !!errorMessage

  useEffect(() => {
        // Actualizar nombreShow cuando cambie nombreActualShow
        setNombreShow(nombreActualShow)
    }, [nombreActualShow])

    useEffect(() => {
        setEstadoShow(estadoActualShow)
    }, [estadoActualShow])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validarNombre()){
            setErrorMessage('Ingrese un nombre valido')
        }else{
            actualizarEstado(estadoShow, nombreShow)
            handleClose()
        }
    }

    const validarNombre = () => {
        return nombreShow.trim() == ""
    }
    

    return (
        <>
        <Modal
        open= {open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleSubmit} style={style} >
            <TextField
                required
                label="Nombre del Show"
                value={nombreShow}
                variant='standard'
                onChange={(e) => setNombreShow(e.target.value)}
                style={{marginBottom: "1rem"}}
            />
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    value={estadoActualShow}
                    variant='standard'
                    label="Estado del Show"
                    onChange={(event) => {
                        setEstadoShow(event.target.value)
                        handleChange(event.target.value)
                    }}
                    style={{marginBottom: "1rem"}}
                    >
                        {ESTADOS_SHOW.map((estado, index) =>
                            <MenuItem key={index} value={estado}>{estado}</MenuItem>
                        )}
                        
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Actualizar
            </Button>
            </form>
        </Modal>
        <Snackbar
                open={snackbarOpen}
                variant="error"
                autoHideDuration={1800}
                onClose={() => setErrorMessage(false)}
                anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}
                style={{ marginBottom: '8rem', fontSize: '400rem' }}
            >
                <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
        </>
    )
}

export default ModalEstadoShow