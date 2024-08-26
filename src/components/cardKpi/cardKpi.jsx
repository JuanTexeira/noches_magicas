import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './cardKpi.css'

const CardKpi = ({item, buttonFunctions}) => {

  return (
    <>
      <Card
        className={`${item.establecerClase()}`}
        variant="outlined"
        sx={{ minWidth: 200 }}
      >
          <CardContent
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            <Typography variant='h6'>
                {item.texto}
            </Typography>
            <Typography variant='h6' sx={{mt: 2}}>
                {item.cantidad}
            </Typography>
          </CardContent>
      </Card>
    </>
  )
}

export default CardKpi
