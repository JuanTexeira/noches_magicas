import dayjs from 'dayjs'

export class Usuario {
  constructor() {
    this.id = 0
    this.nombre = ''
    this.apellido = ''
    this.fechaDeNacimiento = dayjs()
    this.esAdmin = false
    this.credito = 0
    this.imagen = ''
  }

  edad() {
    const fechaActual = dayjs()
    const años = fechaActual.diff(this.fechaDeNacimiento, 'year')
    return años
  }

  toJson() {
    return JSON.stringify(this)
  }

  cargarCredito(cantidad) {
    this.credito += cantidad
  }

  static fromJSON(usuarioJSON) {
    const result = Object.assign(new Usuario(), usuarioJSON)
    return result
  }
}
