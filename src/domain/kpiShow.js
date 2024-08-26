export class KpiShow{
    constructor() {
        this.ingresosTotalesShow = 0
        this.entradasVendidasTotales = 0
        this.entradasVendidasPorTipo = []
        this.costoTotal = 0
        this.cantidadSuscriptores = 0
        this.cantidadFuncionesShow = 0
        this.cantidadFuncionesSoldOut = 0
        this.entradaMasBarata = 0
        this.estadoDeShow = ""
        this.puedoCrearFuncion = ""
        this.nombreShow = ""
        this.cantidadDeClicks = 0
    }

    rentabilidad() {
        return this.ingresosTotalesShow > 0 ? (100 - (this.costoTotal * 100 / this.ingresosTotalesShow)).toFixed(2) : 0
    }

    static fromJSON(kpiShowJSON) {
        const result = Object.assign(new KpiShow(), kpiShowJSON)
        return result
    }
}