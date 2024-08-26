import Typography from '@mui/material/Typography'

const EstadisticasDetalladas = ({ estadisticas }) => {
  const style = { fontWeight: '600' }

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <Typography variant="h6">
        <span style={style}>Entradas vendidas totales: </span>{' '}
        {estadisticas.entradasVendidasTotales}
      </Typography>
      {estadisticas.entradasVendidasPorTipo.map((entrada, index) => (
        <Typography variant="h6" key={index}>
          <span style={style}>
            Entradas vendidas {entrada.first.replace(/_/g, ' ').toLowerCase()}
          </span>
          : {entrada.second}
        </Typography>
      ))}
      <Typography variant="h6">
        <span style={style}>Recaudacion Total: </span> $
        {estadisticas.ingresosTotalesShow}
      </Typography>
      <Typography variant="h6">
        <span style={style}>Costo total: </span> ${estadisticas.costoTotal}
      </Typography>
      <Typography variant="h6">
        <span style={style}>Gente en espera: </span>{' '}
        {estadisticas.cantidadSuscriptores}
      </Typography>
      <Typography variant="h6">
        <span style={style}>Cantidad De Clicks </span>{' '}
        {estadisticas.cantidadDeClicks}
      </Typography>
    </div>
  )
}

export default EstadisticasDetalladas
