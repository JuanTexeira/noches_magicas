import axios from 'axios'
import { REST_SERVER_URL, userId } from './config'
import { Usuario } from 'src/domain/Usuario'
import { Show } from 'src/domain/show'
import dayjs from 'dayjs'
// import { mockShow } from 'src/mocks/show.mock'

class UserService {
  userID = () => localStorage.getItem('usuId')

  async getPerfilUsuario() {
    const usuario = await axios.get(
      `${REST_SERVER_URL}/perfil-usuario/${this.userID()}`,
    )
    return usuario.data
  }

  async getCart() {
    const entradasJSON = await axios.get(`${REST_SERVER_URL}/cart`, {
      params: { idUsuario: userId() },
    })
    const entradas = entradasJSON.data.map((entradaJSON) =>
      Show.fromJSON(entradaJSON),
    )
    return entradas
  }

  /* Se cambian parametros de headers para corregir error y matchear solicitud con el controller del back */
  async clearCart() {
    const idUsuario = userId()
    const cart = await axios.post(`${REST_SERVER_URL}/clearCart`, idUsuario, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return cart.data
  }

  async getTotalCarrito() {
    const total = await axios.get(`${REST_SERVER_URL}/totalCarrito`, {
      params: { idUsuario: userId() },
    })
    return total
  }

  async comprarEntradas() {
    const idUsuario = userId()
    const cart = await axios.post(
      `${REST_SERVER_URL}/comprar-entradas`,
      idUsuario,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return cart.data
  }

  async getLowData() {
    const usuario = await axios.get(
      `${REST_SERVER_URL}/usuario-low-data/${this.userID()}`,
    )
    return usuario.data
  }

  async actualizarPerfilUsuario(dataActualizada) {
    await axios.put(
      `${REST_SERVER_URL}/actualizar-usuario/${this.userID()}`,
      dataActualizada,
    )
  }

  async agregarCredito(credito) {
    await axios.put(`${REST_SERVER_URL}/sumar-credito/${this.userID()}`, {
      cantidad: credito,
    })
  }

  async getAmigos() {
    const amigosJSON = await axios.get(
      `${REST_SERVER_URL}/perfil-usuario/amigos`,
      { params: { idUsuario: userId() } },
    )
    const amigos = amigosJSON.data.map((amigoJSON) =>
      Usuario.fromJSON(amigoJSON),
    )
    return amigos
  }

  async deleteAmigo(idAmigo) {
    await axios.delete(`${REST_SERVER_URL}/deleteAmigo`, {
      params: { idUsuario: userId(), idAmigo: idAmigo },
    })
  }

  async deleteEntradaCarrito(idDelShow, tipoUbicacion) {
    await axios.delete(`${REST_SERVER_URL}/deleteEntradaCarrito`, {
      params: { idUsuario: userId(), idShow: idDelShow, tipoUbicacion: tipoUbicacion },
    })
  }

  async getEntradasPorUsuario() {
    const entradasJSON = await axios.get(
      `${REST_SERVER_URL}/perfil-usuario/entradas`,
      { params: { idUsuario: userId() } },
    )
    const entradas = entradasJSON.data.map((entradaJSON) =>
      Show.fromJSON(entradaJSON),
    )
    return entradas
  }

  async comentarShow(idEntrada, mensaje, calificacion) {
    const comentario = await axios.post(`${REST_SERVER_URL}/comentarShow`, {
      idUsuario: userId(),
      idEntrada: idEntrada,
      mensaje: mensaje,
      calificacion: calificacion,
      fecha: dayjs().format('YYYY-MM-DD'),
    })

    return comentario.data
  }

  async agregarEntradasCarrito(entradas) {
    await axios.put(
      `${REST_SERVER_URL}/agregar-entradas-carrito/${this.userID()}`,
      entradas,
    )
  }
  async getAmigosSugeridos(){
    const amigos = await axios.get(`${REST_SERVER_URL}/sugerencia-amigos`,{params: { idUsuario: userId()}})
    return amigos.data
  }

  async agregarAmigo(idAmigo) {
    console.log(idAmigo)
    await axios.put(`${REST_SERVER_URL}/agregar-amigo`, null, {
      params: { idUsuario: this.userID(), idAmigo: idAmigo }
    })
  }
  
}

export const userService = new UserService()
