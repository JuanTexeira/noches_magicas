export class ShowAdmin {
  constructor(id, banda, instalacion, evento, fechas, rate, cantidadDeComentarios, costoDelShow, entradas) {
    this.id = id
    this.banda = banda
    this.instalacion = instalacion
    this.evento = evento
    this.fechas = fechas
    this.rate = rate
    this.cantidadDeComentarios = cantidadDeComentarios
    this.costoDelShow = costoDelShow
    // entradas, precio
    this.entradas = entradas
  }

  static fromJSON(showJSON){
    const result = Object.assign(new Show(), showJSON)
    return result
  }

  get entradasRango(){
    return `${Math.min(...this.entradas)} a ${Math.max(...this.entradas)}`
  }

  get fechasRango(){
    const fechasFormateadas = this.formattedFecha
    return `${fechasFormateadas[1]} - ${fechasFormateadas[0]}`
  }

  get imagen(){
    return this.banda.imagen
  } 

  get nombre(){
    return this.banda.nombre
  }
  
  get ubicacion(){
    return this.instalacion.nombre
  }

  get coordenadas(){
    return this.instalacion.ubicacion
  }

  get formattedFecha(){
    const fechasFormateadas = []
    this.fechas.forEach(fecha => {
      const dateObj = new Date(fecha)
      const mes = dateObj.getMonth() + 1
      const dia = dateObj.getDate()
      const fechaFormateada = `${mes}/${dia}`
      fechasFormateadas.push(fechaFormateada)
  })
  return fechasFormateadas
  }

}

export class Banda {
  constructor(
    nombre,
    imagen,
    costo
  ){
    this.nombre = nombre
    this.imagen = imagen
    this.costo = costo
  }
}

export class Instalacion {
  constructor(nombre, ubicacion){
    this.nombre = nombre
    this.ubicacion = ubicacion
  }
}