export class ShowComentario {
  constructor() {
    this.nombre = ''
    this.evento = ''
    this.imagen = ''
    this.comentario = new Comentario()
  }

  static fromJSON(showComentarioJSON) {
    const result = Object.assign(new ShowComentario(), showComentarioJSON)
    return result
  }

  get id() {
    return this.comentario.id
  }

  get fecha() {
    return this.comentario.fecha
  }

  get mensaje() {
    return this.comentario.mensaje
  }

  get calificacion() {
    return this.comentario.calificacion
  }
}

class Comentario {
  constructor() {
    this.id = 0
    this.fecha = new Date()
    this.mensaje = ''
    this.calificacion = 0
  }
}
