import React from 'react'
import { render, screen } from '@testing-library/react'
import { DetalleComponent } from './DetalleComponent'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Test para DetalleComponent', () => {
  test('renderiza correctamente con datos proporcionados', () => {
    const datosPrueba = {
      banda: 'Guardin',
      evento: 'The Hills',
      instalacion: { coordenadaX: 1, coordenaday: 2 , nombre: "Gran Rex"},
      rateFixed: 4,
      cantComentarios: 10,
      imagen: 'guardin.jpg',
      detalleFunciones: [],
      listaComentarios: [],
    }

    render(
      <Router>
        <DetalleComponent datos={datosPrueba} showComments={true} />
      </Router>,
    )

    expect(screen.getByTestId('ubicacion')).toHaveTextContent('Gran Rex')
    const imagenElement = screen.getByAltText('Guardin')
    expect(imagenElement).toBeInTheDocument()
    expect(imagenElement).toHaveAttribute('src', 'guardin.jpg')
  })
})
