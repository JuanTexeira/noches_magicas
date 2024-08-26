
import { act, render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Cart } from './Cart'
import { beforeEach, expect, vi } from 'vitest'
import { userService } from 'src/services/UserService'
import { dataCart } from 'src/routes'
import { showReal2 } from 'src/mocks/shows'





describe('Carrito de compras test', () => {

  vi.mock('src/services/userService')

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Cart data={dataCart} />
      </MemoryRouter>
    )
    vi.clearAllMocks()

  })

  it('el carrito se renderiza correctamente', () => {
    const carrito = screen.getByTestId("Carrito")
    expect(carrito).toBeInTheDocument()
  })

})