export class ShowComprado {
  constructor() {
    this.id = 0
    this.banda = ''
    this.evento = ''
    this.imagen = ''
    this.Ubicacion = ''
    this.rate = 0
    this.precioGastado = 0.0
    this.amigosQueAsisten = []
  }

  
  static fromJSON(showJSON) {
    const result = Object.assign(new Show(), showJSON)
   
    result.amigosQueAsisten = showJSON.amigosQueAsisten.map(
      (amigosQueAsistenJSON) => AmigosQueAsisten.fromJSON(amigosQueAsistenJSON),
    )
    return result
  }
}