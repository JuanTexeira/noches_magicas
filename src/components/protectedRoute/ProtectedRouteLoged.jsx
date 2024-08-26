import { Navigate } from "react-router-dom"

export const ProtectedRouteLoged = ({ children }) => {

  const user = () => localStorage.getItem('usuId')

  if (user() === null) {
    return <Navigate to="/" />
  }

  return children
}
