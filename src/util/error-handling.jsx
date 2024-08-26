const INTERNAL_SERVER_ERROR = 500

export const mostrarMensajeError = (error, setearMensaje) => {
  const status = error.response?.status
  const mensajeError =
    status >= INTERNAL_SERVER_ERROR
      ? 'Ocurrió un error. Consulte al administrador del sistema'
      : !status
        ? 'Ocurrió un error al conectarse al backend. Consulte al administrador del sistema'
        : error.response.data.message
  if (status >= INTERNAL_SERVER_ERROR) {
    console.error(error)
  }
  setearMensaje(mensajeError)
}
