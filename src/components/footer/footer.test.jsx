import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'
import { BrowserRouter } from 'react-router-dom'

describe('Footer component', () => {
  test('todo el footer se renderiza correctamente', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )
    const instagramLink = screen.getByTestId('instagram')
    const facebookLink = screen.getByTestId('facebook')
    const nocheMagicaLink = screen.getByTestId('title')
    const yearText = screen.getByTestId('año')

    expect(instagramLink).toBeInTheDocument()
    expect(facebookLink).toBeInTheDocument()
    expect(nocheMagicaLink).toBeInTheDocument()
    expect(yearText).toBeInTheDocument()

  })
})
