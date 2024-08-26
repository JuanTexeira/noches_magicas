import axios from 'axios'
import { REST_SERVER_URL, userId } from './config'
import { Usuario } from 'src/domain/Usuario'
import { KpiShow } from 'src/domain/kpiShow'
// import { mockShow } from 'src/mocks/show.mock'

class AdministradorService {
    async getKpiShow(idShow, idAdmin) {
        const kpiJSON = await axios.get(`${REST_SERVER_URL}/estadisticasShow/${idShow}?idAdmin=${idAdmin}`)
        return KpiShow.fromJSON(kpiJSON.data)
    }

    async editar(idShow, nuevoEstado, nuevoNombre, idAdmin) {
        await axios.post(`${REST_SERVER_URL}/editar-show/${idShow}?nuevoEstado=${nuevoEstado}&nuevoNombre=${nuevoNombre}&idAdmin=${idAdmin}`)
    }

    async crearShow(showNuevo) {
        // console.log(showNuevo)
        await axios.post(`${REST_SERVER_URL}/crear-show`, {
            'nombreBanda': showNuevo.nombreBanda,
            'imagenBanda': showNuevo.imagenBanda,
            'costoBanda': showNuevo.costoBanda,
            'instalacionId': showNuevo.instalacionId,
            'nombreShow': showNuevo.nombreShow
        })
    }

    async crearFuncion(idShow, fecha){
        await axios.post(`${REST_SERVER_URL}/crear-funcion/${idShow}?fecha=${fecha}`)
    }
}

export const adminService = new AdministradorService()
