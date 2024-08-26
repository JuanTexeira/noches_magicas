import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './navbar'

describe('Test para navbar component', () => {
  beforeEach(() => {
    localStorage.setItem('usuAdm', 'false')

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
  })

  afterEach(() => {
    localStorage.clear()
  })

  test('se renderiza el nav con el titulo correcto', () => {
    expect(screen.getByText('NOCHES-MÁGICAS')).toBeInTheDocument()
  })

  test('se muestra la opción de perfil al hacer clic en el avatar de un usuario comun', () => {
    const avatarButton = screen.getByTestId('boton-avatar')

    fireEvent.click(avatarButton)

    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  test('se muestra la opción de dashboard al hacer clic en el avatar de un usuario admin', () => {
    localStorage.setItem('usuAdm', 'true')
    const avatarButton = screen.getByTestId('boton-avatar')

    fireEvent.click(avatarButton)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
