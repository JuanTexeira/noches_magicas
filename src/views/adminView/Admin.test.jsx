import React from 'react'
import { render, fireEvent, waitFor, screen, act, getByTestId } from '@testing-library/react'
import { AdminView } from './Admin'
import { expect, it, vi } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { showService } from 'src/services/ShowService'
import { adminService } from 'src/services/AdministradorService'

const show = {
  "id": 1,
  "banda": "MGK",
  "evento": "Downfalls High",
  "imagen": "https://tinyurl.com/kbr9c6uh",
  "instalacion": {
    "nombre": "River",
    "coordenadaX": -34.543,
    "coordenadaY": -58.449,
    "ubicaciones": [
      {
        "first": "PALCO",
        "second": 12
      },
      {
        "first": "PLATEA_ALTA",
        "second": 300
      },
      {
        "first": "CAMPO",
        "second": 2000
      }
    ]
  },
  "rate": 3.3600000000000003,
  "cantComentarios": 5,
  "precioMin": 8002.42,
  "precioMax": 16002.42,
  "detalleFunciones": [
    {
      "id": 2,
      "fecha": "2024-07-23T21:30:00",
      "soldout": false
    },
    {
      "id": 3,
      "fecha": "2024-07-25T22:00:00",
      "soldout": false
    }
  ],
  "listaComentarios": [
    {
      "id": 2,
      "nombre": "juan lopez",
      "fecha": "2024-07-20",
      "mensaje": "Estuvo bueno, el volumen podria haber sido mas alto",
      "calificacion": 4.0,
      "imagen": "https://tinyurl.com/4zxrps99"
    },
    {
      "id": 3,
      "nombre": "topa mate",
      "fecha": "2024-09-20",
      "mensaje": "Malisimo, de lo peor que vi",
      "calificacion": 1.0,
      "imagen": "https://tinyurl.com/topamatecito"
    },
    {
      "id": 4,
      "nombre": "miguel borja",
      "fecha": "2024-06-20",
      "mensaje": "Bastante bien, vale su precio",
      "calificacion": 3.8,
      "imagen": "https://tinyurl.com/borjashow"
    },
    {
      "id": 5,
      "nombre": "franco armani",
      "fecha": "2024-07-20",
      "mensaje": "Estuvo bueno, me encanto",
      "calificacion": 5.0,
      "imagen": "https://tinyurl.com/armanishow"
    },
    {
      "id": 6,
      "nombre": "el tiburon",
      "fecha": "2024-07-20",
      "mensaje": "Meh, podría haber sido mejor",
      "calificacion": 3.0,
      "imagen": "https://tinyurl.com/aldosivishow"
    }
  ],
  "amigosQueAsisten": []
}
// vi.mock('axios')
// vi.mock('src/services/ShowService', () => ({
//   showService: {
//     getAll: () => Promise.resolve([show]),
//     getKpiShow: () => Promise.resolve({}),
//   }
// }))

// vi.mock('src/services/AdministradorService', () => ({
//   adminService: {
//     getEstadosShow: () => Promise.resolve([]),
//   }
// }))

vi.mock('src/services/ShowService')
vi.mock('src/services/AdministradorService')

describe('AdminView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <Router>
        <AdminView />
      </Router>
    )
  })

  const mockDatos = show
  const mockKpi = {
    ingresosTotalesShow: 2000000,
    cantidadSuscriptores: 100,
    entradaMasBarata: 50,
    costoTotal: 100000,
    cantidadFuncionesSoldOut: 5,
    cantidadFuncionesShow: 10,
    estadoDeShow: 'Active',
    nombreShow: 'Test Show',
    rentabilidad: () => 20,
  }

  it('el getAll shows se llama 1 sola vez correctamente', async () => {


    showService.getAll.mockResolvedValue(mockDatos)
    adminService.getKpiShow.mockResolvedValue(mockKpi)


    await waitFor(() => {
      expect(showService.getAll).toHaveBeenCalledTimes(1)
    })
  })

})