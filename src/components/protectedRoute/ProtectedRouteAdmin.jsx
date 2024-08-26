import { Navigate } from "react-router-dom"
import { ProtectedRouteLoged } from "./ProtectedRouteLoged"

export const ProtectedRouteAdmin = ({ children, onlyAdmin = false, onlyBuyer = false }) => {

  const esAdmin = () => localStorage.getItem('usuAdm') === 'true'

  if (onlyAdmin && !esAdmin()) {
    return <Navigate to="/" />
  }
  if (onlyBuyer && esAdmin()) {
    return <Navigate to="/" />
  }

  return <ProtectedRouteLoged>{children}</ProtectedRouteLoged>
}
