import { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import dayjs from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { Alert, Snackbar } from '@mui/material'
import { adminService } from 'src/services/AdministradorService'
import { mostrarMensajeError } from 'src/util/error-handling'

const ModalCrearFecha = ({ handleClose, open, idShow, actualizadorElementos }) => {
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

    const [fecha, setFecha] = useState(dayjs().add(1, 'day'))
    const [hora, setHora] = useState(dayjs().add(1, 'hour'))
    const [errorMessage, setErrorMessage] = useState('')
    const snackbarOpen = !!errorMessage


    const crearNuevaFecha = () => {
        const nuevoDia = fecha.date()
        const nuevoMes = fecha.month()
        const nuevoAnio = fecha.year()
        const nuevaHora = hora.hour()
        const nuevaMinuto = hora.minute()
        const nuevaSegundo = hora.second()


        const nuevaFecha = dayjs()
        .set('year', nuevoAnio)
        .set('month', nuevoMes)
        .set('date', nuevoDia)
        .set('hour', nuevaHora)
        .set('minute', nuevaMinuto)
        .set('second', nuevaSegundo)

        return nuevaFecha
    }

    const crearFuncion = async (fecha, nuevoElemento) => {
        try{
            await adminService.crearFuncion(idShow, fecha)
            actualizadorElementos.actualizarElementos(nuevoElemento)
        }catch(error){
            mostrarMensajeError(error, setErrorMessage)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(hora < dayjs() || fecha < dayjs()){
            setErrorMessage('Fecha no valida')
        }else{
            const fechaNueva = crearNuevaFecha().format('YYYY-MM-DDTHH:mm:ss')
            const nuevoElemento = {id: 0, fecha: fechaNueva, soldout: false}
            crearFuncion(fechaNueva, nuevoElemento)
            handleClose()
        }
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
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                'DatePicker',
                                'DateTimePicker',
                                'TimePicker',
                                'DateRangePicker',
                                'DateTimeRangePicker',
                                ]}
                            >
                                <DemoItem label="DatePicker">
                                    <DatePicker
                                        value = {fecha}
                                        // defaultValue={tomorrow}
                                        disablePast
                                        views={['year', 'month', 'day']}
                                        onChange={setFecha}
                                    />
                                </DemoItem>
                                <DemoItem label="TimePicker">
                                    <TimePicker defaultValue={hora} disablePast onChange={setHora} />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Crear
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

export default ModalCrearFecha