import { render, screen, fireEvent } from '@testing-library/react'
import MediaCard from './CardTemplate'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Test para CardTemplate', () => {
  const item = {
    id: 1,
    imagen: 'imagen.jpg',
    banda: 'Guardin',
    evento: 'The Hills',
    rateFixed: 4.5,
    cantComentarios: 10,
    ubicacion: 'Estadio Uno',
    detalleFunciones: [{ fecha: '2024-04-04' }],
    amigosQueAsisten: [
      { id: 1, nombre: 'Pepe', apellido: 'Grillo', imagen: 'pepegrillo.jpg' },
    ],
    precioFixed: 100,
    precioMin: 50,
    precioMax: 150,
  }

  it('se renderiza la card correctamente sin ser entrada', () => {
    render(
      <Router>
        {' '}
        <MediaCard
          item={item}
          hasButton={true}
          esEntrada={false}
          puedeCalificar={false}
        />
      </Router>,
    )

    expect(screen.getByTestId('banda-evento')).toHaveTextContent(
      'Guardin - The Hills',
    )
    expect(screen.getByTestId('precio')).toHaveTextContent('Desde: $50 a $150')
    expect(screen.queryByTestId('fecha')).not.toBeInTheDocument()
    expect(screen.getByTestId('fechas')).toBeInTheDocument()
    expect(screen.queryByTestId('boton-calificar')).not.toBeInTheDocument()
  })

  it('se renderiza la card correctamente siendo entrada', () => {
    render(
      <Router>
        {' '}
        <MediaCard
          item={item}
          hasButton={true}
          esEntrada={true} //Le cambio el valor a true asi el texto que aparece es fecha en vez de fechas
          puedeCalificar={true} //Le cambio el valor a true asi aparece el boton calificar
        />
      </Router>,
    )

    expect(screen.getByTestId('fecha')).toBeInTheDocument()
    expect(screen.queryByTestId('fechas')).not.toBeInTheDocument()
    expect(screen.queryByTestId('boton-calificar')).toBeInTheDocument()
    expect(screen.getByTestId('precio')).toHaveTextContent('Precio: $100')
  })
})
