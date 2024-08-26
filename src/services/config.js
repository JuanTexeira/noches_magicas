export function handleError(error) {
  if (error.response) {
    return error.response.data.message
  } else if (error.request) {
    return 'ha ocurrido un error inesperado al conectar con el servidor, por favor, intente de nuevo mas tarde'
  } else {
    return 'se produjo un error inesperado'
  }
}

export const REST_SERVER_URL = 'http://localhost:8080'
//export const REST_SERVER_URL = process.env.VITE_URL

/* const usuarioId = () => localStorage.getItem('usuId')
export const userId = parseNumber(usuarioId) */

export const userId = () => localStorage.getItem('usuId')
