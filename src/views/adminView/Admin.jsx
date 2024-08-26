// import { showService } from 'src/services/ShowService'
import { Alert, Snackbar } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useEffect, useState } from 'react'
import MediaCardAdmin from 'src/components/cardAdmin/cardAdminTemplate'
import CardFecha from 'src/components/cardFecha/cardFecha'
import CardKpi from 'src/components/cardKpi/cardKpi'
import Carousel from 'src/components/carousel/carousel'
import { kpiMock } from 'src/mocks/kpisShow'
import { showService } from 'src/services/ShowService'
import { mostrarMensajeError } from 'src/util/error-handling'
import { adminService } from 'src/services/AdministradorService'
import ModalEstadoShow from 'src/components/modalEstadoShow/ModalEstadoShow'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import SearchBar from 'src/components/searchBar/searchBar'


//Luego reemplazar por datos del back, mockeado por ahora

export const AdminView = () => {
  const [datos, setDatos] = useState([])
  const [fechas, setFechas] = useState({})
  const [idShow, setIdShow] = useState(-1)
  const [estadosShow, setEstadosShow] = useState([])
  const [kpi, setKpi] = useState({})
  const [estadoShow, setEstadoShow] = useState("")
  const [nombreShow, setNombreShow] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const navigate = useNavigate()
  const idAdmin = Number(localStorage.getItem("usuId"))

  const [filtro, setFiltro] = useState({
    artista: '',
    locacion: '',
    conAmigos: false,
  })


  const getData = async () => {
    try {
      const datosCards = await showService.getAll(filtro)
      setDatos(datosCards)
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  // ------------  ESTADOS SHOW -----------------

  const actualizarEstadoShow = async (nuevoEstado, nuevoNombre) => {
    try {
      await adminService.editar(idShow, nuevoEstado, nuevoNombre, idAdmin)
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  const cambiarEstado = (valor) => {
    setEstadoShow(valor)
  }

  // ----------------------------------------------

  // ------------- FECHAS --------------------------

  const cambiarFechasShow = (fechas, id) => {
    setFechas(fechas)
    setIdShow(id)
  }

  // -----------------------------------------------

  const cerrarModal = () => {
    setOpen(false)
    getData()
  }

  useEffect(() => {
    getData()
  }, [fechas])

  useEffect(() => {
    if (!(idShow < 0)) {
      getKpiShow()
    }
  }, [idShow])


  const snackbarOpen = !!errorMessage

  //----------------------------------- KPI SHOWS -------------------------------------------

  const getKpiShow = async () => {
    try {
      const idAdmin = Number(localStorage.getItem("usuId"))
      const kpiShow = await adminService.getKpiShow(idShow, idAdmin)
      setKpi(kpiShow)
      setEstadoShow(kpiShow.estadoDeShow)
      setNombreShow(kpiShow.nombreShow)
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
    }
  }

  const crearKpis = () => {
    const kpiIngresos = {
      texto: "Ventas",
      cantidad: `$${kpi.ingresosTotalesShow}`,
      establecerClase: () => {
        if (kpi.ingresosTotalesShow <= 1000000) {
          return "valor-bajo"
        } else if (kpi.ingresosTotalesShow > 1000000 && kpi.ingresosTotalesShow <= 2000000) {
          return "valor-medio"
        } else {
          return "valor-alto"
        }
      }
    }
    const kpiPersonasEsperando = {
      texto: "Personas en espera",
      cantidad: kpi.cantidadSuscriptores,
      establecerClase: () => {
        const rentabilidadPosibleShow = 100 - kpi.costoTotal * 100 / (kpi.cantidadSuscriptores * kpi.entradaMasBarata)
        if (rentabilidadPosibleShow <= 0) {
          return "valor-bajo"
        } else if (rentabilidadPosibleShow > 0 && rentabilidadPosibleShow <= 50) {
          return "valor-medio"
        } else {
          return "valor-alto"
        }
      }
    }
    const kpiRentabilidad = {
      texto: "Rentabilidad",
      cantidad: `${kpi.rentabilidad()}%`,
      establecerClase: () => {
        if (kpi.rentabilidad() <= 0) {
          return "valor-bajo"
        } else if (kpi.rentabilidad() > 0 && kpi.rentabilidad() <= 50) {
          return "valor-medio"
        } else {
          return "valor-alto"
        }
      }
    }
    const kpiSoldouts = {
      texto: "Funciones Soldout",
      cantidad: kpi.cantidadFuncionesSoldOut,
      establecerClase: () => {
        const porcentajeSoldouts = kpi.cantidadFuncionesSoldOut * 100 / kpi.cantidadFuncionesShow
        if (porcentajeSoldouts <= 50) {
          return "valor-bajo"
        } else if (porcentajeSoldouts > 50 && porcentajeSoldouts <= 75) {
          return "valor-medio"
        } else {
          return "valor-alto"
        }
      }
    }

    return [kpiIngresos, kpiPersonasEsperando, kpiRentabilidad, kpiSoldouts]
  }

  // -------------------------------------------------------------------------------------------

  // ------------------------------------ SEARCHBAR --------------------------------------------

  const realizarBusqueda = () => {
    getData()
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const param = type === 'checkbox' ? checked : value
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      [name]: param,
    }))
  }


  // ------------------------------------------------------------------------------------------

  const buttonFunctions = {
    handleClickDefault: (fechas, id) => {
      setSelectedCard(id)
      cambiarFechasShow(fechas, id)
    },
    handleButtonEditar: function () {
      setOpen(true)
    },
    handleButtonDetalle: function (id) {
      navigate(`/detalleShow/${id}`)
    },
  }

  return (
    <>
      <div className='main'>
        <SearchBar filtro={filtro} handleChange={handleChange} test={realizarBusqueda} />

        <Carousel
          data={datos}
          componente={MediaCardAdmin}
          functions={buttonFunctions}
          selectedCard={selectedCard}
        />
        <Divider sx={{ my: 2, borderTop: '2px solid grey' }} />
        {
          Object.keys(fechas).length > 0 || kpi.puedoCrearFuncion ?
            <Carousel data={fechas} componente={CardFecha} options={idShow} puedeCrear={kpi.puedoCrearFuncion} />
            : null
        }
        <Divider sx={{ my: 2, borderTop: '2px solid grey' }} />
        {
          Object.keys(kpi).length ?
            <Carousel data={crearKpis()} componente={CardKpi} />
            : ""
        }

        <ModalEstadoShow open={open} handleClose={cerrarModal} estadoActualShow={estadoShow} nombreActualShow={nombreShow} actualizarEstado={actualizarEstadoShow} estadosShow={estadosShow} handleChange={(valor) => cambiarEstado(valor)} />

        <Snackbar
          open={snackbarOpen}
          variant="error"
          autoHideDuration={1800}
          onClose={() => setErrorMessage(false)}
          style={{ marginBottom: '8rem', fontSize: '400rem' }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      </div>
    </>
  )
}