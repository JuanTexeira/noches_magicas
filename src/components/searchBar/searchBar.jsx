import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import Groups3RoundedIcon from '@mui/icons-material/Groups3Rounded'
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded'
import { green } from '@mui/material/colors'

const SearchBar = ({ filtro, handleChange, test }) => {
  const esAdministrador = localStorage.getItem('usuAdm') === 'true'

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      test()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        pb: '1rem',
        pt: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '1em',
        }}
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Artista</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <Groups3RoundedIcon />
              </InputAdornment>
            }
            type="text"
            name="artista"
            value={filtro.artista}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Nombre del artista"
          />
        </FormControl>
        <FormControl variant="standard" sx={{ mr: 3 }}>
          <InputLabel htmlFor="input-with-icon-adornment">Locación</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <StadiumRoundedIcon />
              </InputAdornment>
            }
            type="text"
            name="locacion"
            value={filtro.locacion}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Estadio, teatro o locación"
          />
        </FormControl>
      </Box>
      {!esAdministrador && (
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: green[800],
                '&.Mui-checked': {
                  color: green[600],
                },
              }}
              type="checkbox"
              name="conAmigos"
              checked={filtro.conAmigos}
              onChange={handleChange}
            />
          }
          label="Con amigos"
        />
      )}

      <Button
        size="medium"
        startIcon={<SearchRoundedIcon />}
        variant="contained"
        color="success"
        onClick={test}
        onKeyPress={handleKeyPress}
      >
        Buscar
      </Button>
    </Box>
  )
}

export default SearchBar
