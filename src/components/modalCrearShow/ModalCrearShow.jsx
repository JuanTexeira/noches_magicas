import { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import { Alert, Snackbar, Select, MenuItem, TextField, InputLabel } from "@mui/material"
import { mostrarMensajeError } from 'src/util/error-handling'
import { adminService } from 'src/services/AdministradorService'



const ModalCrearShow = ({ handleClose, open }) => {
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

    const [nombreShow, setNombreShow] = useState("")
    const [nombreBanda, setNombreBanda] = useState("")
    const [linkImagenBanda, setLinkImagenBanda] = useState("")
    const [costoBanda, setCostoBanda] = useState(0)
    const [instalacionId, setInstalacionId] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const snackbarOpen = !!errorMessage

    const INSTALACIONES = [{nombre: "River", id: 1}, {nombre: "Gran Rex", id: 2}, {nombre: "Velez", id:3}]

    const crearShow = async() => {
        const showNuevo = {
            nombreBanda : nombreBanda,
            imagenBanda : linkImagenBanda,
            costoBanda : costoBanda,
            instalacionId : instalacionId,
            nombreShow : nombreShow,
        }

        try{
            await adminService.crearShow(showNuevo)
        }catch(error){
            mostrarMensajeError(error, setErrorMessage)
        }
    }

    const validarNombreBanda = () => {
        return !nombreBanda.trim() == ""
    }

    const validarNombreShow = () => {
        return !nombreShow.trim() == ""
    }

    const validarImagenBanda = () => {
        return !linkImagenBanda.trim() == ""
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validarNombreBanda() && validarImagenBanda() && validarNombreShow()){
            crearShow()
            handleClose()
        }else{
            setErrorMessage("Ningun campo puede quedar vacio")
        }
    }

    return (
        <>
           <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <form onSubmit={handleSubmit} style={style}>
                    <TextField
                        required
                        label="Nombre de la banda"
                        value={nombreBanda}
                        variant='standard'
                        onChange={(e) => setNombreBanda(e.target.value)}
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        required
                        label="Link de imagen de la banda"
                        value={linkImagenBanda}
                        variant='standard'
                        onChange={(e) => setLinkImagenBanda(e.target.value)}
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        required
                        label="Costo de la banda"
                        type='number'
                        value={costoBanda}
                        variant='standard'
                        onChange={(e) => setCostoBanda(Number(e.target.value))}
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        required
                        label="Nombre del Show"
                        value={nombreShow}
                        variant='standard'
                        onChange={(e) => setNombreShow(e.target.value)}
                        style={{ marginBottom: "1rem" }}
                    />
                    <FormControl fullWidth variant='standard' style={{ marginBottom: "1rem" }}>
                        <InputLabel id="instalacion-label">Instalacion</InputLabel>
                        <Select
                            labelId="instalacion-label"
                            id="instalacion-select"
                            value={instalacionId}
                            onChange={(event) => setInstalacionId(event.target.value)}
                        >
                            {INSTALACIONES.map((instalacion, index) =>
                                <MenuItem key={index} value={instalacion.id}>{instalacion.nombre}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Crear
                    </Button>
                </form>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1800}
                onClose={() => setErrorMessage(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                style={{ marginBottom: '8rem' }}
            >
                <Alert severity="error">{errorMessage}</Alert>
            </Snackbar>
        </>
    )
}

export default ModalCrearShow
