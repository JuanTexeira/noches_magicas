import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import './cardAdminTemplate.css'

export default function MediaCardAdmin({
  item,
  buttonFunctions,
  isSelected,
  onClick,
}) {
  const handleEditClick = (e) => {
    buttonFunctions.handleButtonEditar(item.id)
  }

  const handleDetalleClick = (e) => {
    e.stopPropagation()
    buttonFunctions.handleButtonDetalle(item.id)
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 300,
      }}
      onClick={() => {
        buttonFunctions.handleClickDefault(item.detalleFunciones, item.id)
      }}
      className={`card-admin-show ${isSelected ? 'selected-show' : ''}`}
    >
      <CardMedia
        component="img"
        height="194"
        image={item.imagen}
        alt="Imagen"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.evento}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          Ubicacion: {item.nombreInstalacion}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          Desde {item.rangoPrecios()}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display={'flex'} width={'100%'}>
          <IconButton
            className={`btn-edit ${isSelected ? 'selected-edit-btn' : ''}`}
            onClick={handleEditClick}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Box>
          <Button
            variant="contained"
            className={`btn-show ${isSelected ? 'selected-show-btn' : ''}`}
            onClick={handleDetalleClick}
          >
            Detalle
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}
