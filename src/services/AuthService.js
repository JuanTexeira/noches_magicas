/* eslint-disable no-unused-vars */
import axios from 'axios'
import { REST_SERVER_URL } from './config'

class AuthService {
  async validarUsuario(username, password) {
    const usuarioId = await axios.post(`${REST_SERVER_URL}/login`, { 'username': username,
    'password':password})
    return usuarioId.data
  }

  async registrarUsuario(signup) {
    const usuarioId = await axios.post(`${REST_SERVER_URL}/signup`, { 'username': signup.username,
    'password': signup.password, 'nombre': signup.nombre, 'apellido': signup.apellido, 'fechaNacimiento': signup.fechaNacimiento})
    return this.validarUsuario(signup.username, signup.password)
  }

}

const authService = new AuthService()
export default authService