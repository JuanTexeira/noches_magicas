import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PerfilLayout } from './PerfilLayout'

describe('tests de tabs', () => {
  test('al darle click al tab amigos me lleva a la view correspondiente ', () => {
    render(
      <BrowserRouter>
        <PerfilLayout />
      </BrowserRouter>
    )

    const amigosTab = screen.getByTestId('amigosTab')
    fireEvent.click(amigosTab)
    expect(window.location.pathname).toBe('/perfil/amigos')
  })

  test('al darle click al tab entradas me lleva a la view correspondiente ', () => {
    render(
      <BrowserRouter>
        <PerfilLayout />
      </BrowserRouter>
    )

    const entradasTab = screen.getByTestId('entradasTab')
    fireEvent.click(entradasTab)
    expect(window.location.pathname).toBe('/perfil/entradas')
  })

  test('al darle click al tab comentarios me lleva a la view correspondiente ', () => {
    render(
      <BrowserRouter>
        <PerfilLayout />
      </BrowserRouter>
    )

    const comentariosTab = screen.getByTestId('comentariosTab')
    fireEvent.click(comentariosTab)
    expect(window.location.pathname).toBe('/perfil/comentarios')
  })
})
