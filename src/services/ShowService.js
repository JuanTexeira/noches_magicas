import axios from 'axios'
import { REST_SERVER_URL, userId } from './config'
import { Show } from 'src/domain/show'
import { ShowComentario } from 'src/domain/showComentario'

class ShowService {
  async getAll(filter) {
    const showsJSON = await axios.get(`${REST_SERVER_URL}/all-shows`, {
      params: {
        idUsuario: userId(),
        artista: filter.artista,
        locacion: filter.locacion,
        conAmigos: filter.conAmigos,
      },
    })
    const shows = showsJSON.data.map((showJSON) => Show.fromJSON(showJSON))
    return shows
  }

  async getAllDisponibles(filter) {
    const showsJSON = await axios.get(`${REST_SERVER_URL}/shows`, {
      params: {
        idUsuario: userId(),
        artista: filter.artista,
        locacion: filter.locacion,
        conAmigos: filter.conAmigos,
      },
    })
    const shows = showsJSON.data.map((showJSON) => Show.fromJSON(showJSON))
    return shows
  }

  async logClick(id) {
    await axios.post(`${REST_SERVER_URL}/clicklog?idShow=${id}&idUsuario=${userId()}`)
  }

  async getById(idShow) {
    const showJSON = await axios.get(`${REST_SERVER_URL}/detalleShow`, {
      params: { idShow: idShow, idUsuario: userId() },
    })
    const show = Show.fromJSONFriendless(showJSON.data)
    return show
  }

  async getComentariosPorUsuario() {
    const showsComentarioJSON = await axios.get(
      `${REST_SERVER_URL}/perfil/comentarios`,
      { params: { idUsuario: userId() } },
    )
    const showsComentario = showsComentarioJSON.data.map((showComentarioJSON) =>
      ShowComentario.fromJSON(showComentarioJSON),
    )
    return showsComentario
  }

  async deleteComentario(idComentario) {
    await axios.delete(`${REST_SERVER_URL}/deleteComentario`, {
      params: { idComentario: idComentario },
    })
  }
}

export const showService = new ShowService()
