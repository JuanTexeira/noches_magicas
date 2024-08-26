import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PerfilSide } from './PerfilSide'
import { userService } from 'src/services/UserService'
import { vi } from 'vitest'
import { act } from 'react-dom/test-utils'


describe('PerfilSide', () => {
  vi.mock('src/services/UserService')
  const mockedPerfil = {
    imagen: 'urlestatica',
    nombre: 'John',
    apellido: 'Doe',
    fechaDeNacimiento: '1990-01-01',
    credito: 100
  }

  beforeEach(() => {
    userService.getPerfilUsuario.mockResolvedValue(mockedPerfil)

  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('al renderizar el componente llama al service para la data del perfil', async () => {
    render(
      <BrowserRouter>
        <PerfilSide />
      </BrowserRouter>
    )
    await waitFor(() => {
      expect(userService.getPerfilUsuario).toHaveBeenCalled()
    })
  })


  test('al darle a sumar llama al metodo correspondiente del service', async () => {
    render(
      <BrowserRouter>
        <PerfilSide />
      </BrowserRouter>
    )


    fireEvent.click(screen.getByTestId('btn_sumar'))

    await waitFor(() => {
      expect(userService.agregarCredito).toHaveBeenCalled()
    })
  })


})
