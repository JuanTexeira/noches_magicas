import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import { NochesMagicasRouter } from './routes'
import { Loader } from './components/Loader/Loader'
import { useEffect, useState } from 'react'

function App() {
  // cuando nos pongamos de acuerdo cambiamos los colores, estos son placeholders




  const theme = createTheme({
    palette: {
      primary: {
        main: '#000040',
      },
      secondary: {
        main: '#c0c0c0',
      },
    }, typography: {
      fontFamily: [
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  })


  return (
    <>
      <ThemeProvider theme={theme}>
        <NochesMagicasRouter />
      </ThemeProvider>
    </>
  )

}

export default App
