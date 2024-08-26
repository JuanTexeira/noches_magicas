import axios from 'axios'
import { REST_SERVER_URL } from './config'

class FuncionService {

  userID = () => localStorage.getItem('usuId')

  async getEntradas(id) {
    const entradasFuncion = await axios.get(`${REST_SERVER_URL}/funcion/entradas/${id}`,)
    return entradasFuncion.data
  }

  async suscribirseAFuncion(id) {
    await axios.post(`${REST_SERVER_URL}/funcion/suscribirse-a-show/${this.userID()}?showId=${id}`)
  }
}

export const funcionService = new FuncionService()
