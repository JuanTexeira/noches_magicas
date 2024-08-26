import { KpiShow } from "src/domain/kpiShow"

const kpiJSON = {
    montoIngresos: 1345555,
    entradasVendidasTotales: 0,
    entradasVendidasPlateaAlta: 0,
    entradasVendidasPalco: 0,
    entradasVendidasCampo: 0,
    costoTotal: 1000000,
    genteEsperando: 1000,
    funcionesTotales: 4,
    funcionesSoldout: 2,
    valorEntradaMasBarata: 2600
}

export const kpiMock = Object.assign(new KpiShow, kpiJSON)

