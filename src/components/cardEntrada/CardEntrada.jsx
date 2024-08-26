import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export const CardEntrada = ({
  entrada,
  onCantidadChange,
  soldOut,
  disabled,
  setSelectedCard,
}) => {
  const [cantidad, setCantidad] = useState(0)

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value)
    setCantidad(value)
    onCantidadChange({
      id: entrada.id,
      cantidad: value,
      ubicacion: entrada.ubicacion,
    })
    if (value > 0) {
      setSelectedCard(entrada.cardId)
    } else {
      setSelectedCard(null)
    }
  }

  return (
    <Card sx={{ minWidth: '100%' }}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          maxHeight: '2rem',
          border: '1px solid',
          borderRadius: '0.5rem',
          marginTop: '0.3rem',
        }}
      >
        <Typography variant="body1">
          {entrada.ubicacion.replace(/_/g, ' ').toUpperCase()}
        </Typography>
        <Box sx={{ mx: 1 }} />
        <Typography variant="body1">{`Precio $${entrada.precio}`}</Typography>
        <TextField
          type="number"
          variant="outlined"
          sx={{ maxWidth: '4rem' }}
          inputProps={{ min: 0 }}
          defaultValue={0}
          value={cantidad}
          onChange={handleCantidadChange}
          disabled={soldOut || disabled}
        />
      </CardContent>
    </Card>
  )
}
