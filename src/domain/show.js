import dayjs from 'dayjs'

export class Show {
  constructor() {
    this.id = 0
    this.banda = ''
    this.evento = ''
    this.imagen = ''
    this.instalacion = new Instalacion()
    this.nombreInstalacion = ''
    this.rate = 0
    this.cantComentarios = 0
    this.precioMin = 0.0
    this.precioMax = 0.0
    this.precio = 0.0
    this.listaComentarios = []
    this.detalleFunciones = []
    this.amigosQueAsisten = []
    this.puedeCalificar = false
    this.idDelShow = ""
    this.tipoUbicacion = ""
  }

  static fromJSON(showJSON) {
    const result = Object.assign(new Show(), showJSON)

    result.amigosQueAsisten = showJSON.amigosQueAsisten.map(
      (amigosQueAsistenJSON) => AmigosQueAsisten.fromJSON(amigosQueAsistenJSON),
    )
    result.instalacion = Instalacion.fromJSON(showJSON.instalacion)
    return result
  }

  static fromJSONFriendless(showJSON) {
    const result = Object.assign(new Show(), showJSON)
    return result
  }

  get ubicacion() {
    return this.instalacion.nombre
  }

  get ubicacionEntrada() {
    return this.nombreInstalacion
  }

  get coordenadas() {
    return this.instalacion.ubicacion
  }

  get ubicaciones() {
    return this.instalacion.ubicaciones
  }

  get rateFixed() {
    return this.rate.toFixed(2)
  }

  get precioFixed() {
    return this.precio.toFixed(2)
  }

  rangoFechas() {
    const fechasFunciones = this.detalleFunciones.map((funcion) =>
      dayjs(funcion.fecha).format('DD/MM'),
    )
    fechasFunciones.sort((a, b) => a - b)
    const stringRango = `${fechasFunciones[0]} - ${fechasFunciones[fechasFunciones.length - 1]}`

    return stringRango
  }

  rangoPrecios() {
    return `$${this.precioMin} a $${this.precioMax}`
  }
}

export class Instalacion {
  constructor() {
    this.nombre = ''
    this.coordenadaX = 0
    this.coordenadaY = 0
    this.ubicaciones = []
  }

  static fromJSON(instalacionJSON) {
    const result = Object.assign(new Instalacion(), instalacionJSON)
    return result
  }
}

export class Funcion {
  constructor() {
    this.fecha = ''
    this.id = ''
    this.soldout = false
  }

  static fromJSON(funcionJSON) {
    const result = Object.assign(new Funcion(), funcionJSON)
    return result
  }
}

export class AmigosQueAsisten {
  constructor() {
    this.id = 0
    this.nombre = ''
    this.apellido = ''
    this.imagen = ''
  }

  static fromJSON(amigosQueAsistenJSON) {
    const result = Object.assign(new AmigosQueAsisten(), amigosQueAsistenJSON)
    return result
  }
}

export class Ubicacion {
  constructor() {
    this.tipoUbicacion = ''
    this.capacidad = 0
    this.id = 0
  }

  static fromJSON(ubicacionJSON) {
    const result = Object.assign(new Ubicacion(), ubicacionJSON)
    return result
  }
}
