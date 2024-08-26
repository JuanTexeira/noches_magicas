import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { CardActionArea } from '@mui/material'
import './cardFecha.css'
import dayjs from 'dayjs'

const CardFecha = (props) => {
  const esAdmin = () => localStorage.getItem('usuAdm') == 'true'

  const establecerBorde = (e) => {
    const cardsFecha = document.querySelectorAll('.card-fecha')
    const cardClickada = e.currentTarget.parentElement
    cardsFecha.forEach((card) => {
      card.classList.remove('selected')
    })
    cardClickada.classList.add('selected')
  }

  return (
    <>
      <Card
        className={`card-fecha ${props.item.soldout ? 'soldout' : ''}`}
        variant="outlined"
        sx={{ maxWidth: 200 }}
      >
        <CardActionArea
          onClick={(e) => {
            esAdmin() ? '' : establecerBorde(e)
            props.handleClick ? props.handleClick() : ''
          }}
        >
          <CardContent
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h5">
                {dayjs(props.item.fecha).format('dddd')}
              </Typography>
              <Typography variant="h5">
                {dayjs(props.item.fecha).format('DD/MM')}
              </Typography>
            </Box>
            <Typography variant="h5">
              {dayjs(props.item.fecha).format('h:mm A')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default CardFecha
