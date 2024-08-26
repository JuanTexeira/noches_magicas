import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import authService from 'src/services/AuthService'
import { LoginView } from './LoginView'
import { vi } from 'vitest'
import { act } from 'react-dom/test-utils'

vi.mock('src/services/AuthService')

describe('LoginView', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    )
    vi.clearAllMocks()
  })

  it('should render the login form by default', () => {

    expect(screen.getByText('Ingresar')).toBeInTheDocument()
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
  })

  it('should render the signup form when switching', () => {

    fireEvent.click(screen.getByText('Registrate aqui!'))

    expect(screen.getByText('Registrarse')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Apellido')).toBeInTheDocument()
    expect(screen.getByLabelText('Fecha de nacimiento')).toBeInTheDocument()
  })

  it('should call iniciarSesion when submitting the login form', async () => {


    const mockUsuario = { id: 1, administrador: false }
    authService.validarUsuario.mockResolvedValue(mockUsuario)

    await userEvent.type(screen.getByLabelText('Usuario'), 'testUser')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'testPassword')

    act(() => {
      screen.getByText('Ingresar').click()
    })

    expect(authService.validarUsuario).toHaveBeenCalledWith('testUser', 'testPassword')
  })

  it('should call registrarse when submitting the signup form', async () => {


    const mockUsuarioId = { id: 1, administrador: false }
    authService.registrarUsuario.mockResolvedValue(mockUsuarioId)

    fireEvent.click(screen.getByText('Registrate aqui!'))

    await userEvent.type(screen.getByLabelText('Usuario'), 'newUser')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'newPassword')
    await userEvent.type(screen.getByLabelText('Nombre'), 'John')
    await userEvent.type(screen.getByLabelText('Apellido'), 'Doe')
    await userEvent.type(screen.getByLabelText('Fecha de nacimiento'), '2022-06-30')

    act(() => {
      screen.getByText('Registrarse').click()
    })

    expect(authService.registrarUsuario).toHaveBeenCalledWith({
      username: 'newUser',
      password: 'newPassword',
      nombre: 'John',
      apellido: 'Doe',
      fechaNacimiento: '2022-06-30',
    })
  })
})
