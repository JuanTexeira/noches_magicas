import { Container } from '@mui/material'
import { CardGrid } from 'src/components/cardGrid/cardGrid'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import SearchBar from 'src/components/searchBar/searchBar'
import { useSearchParams } from 'react-router-dom'

export const Shows = ({ data }) => {
  const [params, setParams] = useSearchParams()

  const [filtro, setFiltro] = useState({
    artista: params.get('artista') || '',
    locacion: params.get('locacion') || '',
    conAmigos: params.get('conAmigos') === 'true' || false,
  })

  const childRef = useRef()

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const param = type === 'checkbox' ? checked : value
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      [name]: param,
    }))
  }

  useEffect(() => {
    const newParams = new URLSearchParams()
    newParams.append('artista', filtro.artista)
    newParams.append('locacion', filtro.locacion)
    newParams.append('conAmigos', filtro.conAmigos)
    setParams(newParams)
  }, [filtro, setParams])

  function test() {
    childRef.current.getDataChildren()
  }

  return (
    <Container
      className="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <SearchBar filtro={filtro} handleChange={handleChange} test={test} />

      <CardGrid
        ref={childRef}
        data={data}
        hasButton={true}
        width={3.5}
        filter={filtro}
      />
    </Container>
  )
}
