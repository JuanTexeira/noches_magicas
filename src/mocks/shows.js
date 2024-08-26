// import { Banda, Instalacion, ShowAdmin } from "src/domain/showAdmin"
import { Show } from "src/domain/show"


const showJSON = {
  id : 1,
  banda: "MGK",
  evento: "Downfalls High",
		imagen: "https://tinyurl.com/kbr9c6uh",
		instalacion: {
			nombre: "River",
			ubicacion: {
				first: -34.543,
				second: -58.449
			},
			ubicaciones: [
				{
					first: "Palco",
					second: 12
				},
				{
					first: "Platea Alta",
					second: 300
				},
				{
					first: "Campo",
					second: 2000
				}
			]
		},
		rate: 4.0,
		cantComentarios: 5,
		precioMin: 10800.0,
		precioMax: 14800.0,
		listaComentarios: [
			{
				id: 2,
				nombre: "juan lopez",
				fecha: "2024-07-20",
				mensaje: "Estuvo bueno, el volumen podria haber sido mas alto",
				calificacion: 4.0,
				imagen: "https://tinyurl.com/4zxrps99"
			},
			{
				id: 3,
				nombre: "daniel lopez",
				fecha: "2024-07-20",
				mensaje: "Estuvo bueno, el volumen podria haber sido mas alto",
				calificacion: 4.0,
				imagen: "https://tinyurl.com/4zxrps99"
			},
			{
				id: 4,
				nombre: "alex lopez",
				fecha: "2024-07-20",
				mensaje: "Estuvo bueno, el volumen podria haber sido mas alto",
				calificacion: 4.0,
				imagen: "https://tinyurl.com/2k5rsbdy"
			},
			{
				id: 5,
				nombre: "marcelo lopez",
				fecha: "2024-07-20",
				mensaje: "Estuvo bueno, el volumen podria haber sido mas alto",
				calificacion: 4.0,
				imagen: "https://tinyurl.com/4zxrps99"
			},
			{
				id: 6,
				nombre: "franco lopez",
				fecha: "2024-07-20",
				mensaje: "Estuvo bueno, el volumen podria haber sido mas alto",
				calificacion: 4.0,
				imagen: "https://tinyurl.com/4zxrps99"
			}
		],
		funciones: [
			{
				fecha: "2024-03-23T21:30:00",
				id: 1,
				soldout: false
			},
			{
				fecha: "2024-04-25T22:00:00",
				id: 2,
				soldout: false
			}
		]
	}

const showJSON2 = {
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
	"nombreInstalacion" : 'River',
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

export const showReal = Object.assign(new Show(), showJSON)

export const showReal2 = Object.assign(new Show(), showJSON2)

export const shows = [showReal, showReal2]