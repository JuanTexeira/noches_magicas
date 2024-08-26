import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import MediaCard from './components/card/CardTemplate.jsx'
import { CardAmigo } from './components/cardAmigo/CardAmigo.jsx'
import { CardGrid } from './components/cardGrid/cardGrid.jsx'
import Comment from './components/comment/Comment.jsx'
import { LayoutWrap } from './components/layoutWrap/LayoutWrap.jsx'
import { PerfilLayout } from './components/perfilLayout/PerfilLayout.jsx'
import { ProtectedRouteAdmin } from './components/protectedRoute/ProtectedRouteAdmin.jsx'
import { showService } from './services/ShowService.js'
import { userService } from './services/UserService.js'
import { AdminView } from './views/adminView/Admin.jsx'
import { Cart } from './views/cart/Cart.jsx'
import DetalleShow from './views/detalleShow/detalleShow.jsx'
import { LoginView } from './views/loginView/LoginView.jsx'
import { Shows } from './views/shows/Shows.jsx'

export const dataShows = {
  component: (item, hasButton, esEntrada) => (
    <MediaCard item={item} hasButton={hasButton} esEntrada={false} />
  ),
  datosService: async (filter) => showService.getAllDisponibles(filter),
}

export const dataCart = {
  component: (item, hasButton, deleteCard, onRefresh) => (
    <MediaCard
      item={item}
      hasButton={hasButton}
      esEntrada={true}
      esBorrable={true}
      deleteCard={deleteCard}
      onRefresh={onRefresh}
    />
  ),
  datosService: async (filter) => userService.getCart(),
  clearService: async () => userService.clearCart(),
  totalCarritoService: async () => userService.getTotalCarrito(),
  comprarService: async () => userService.comprarEntradas(),
  deleteService: async (idDelShow, tipoUbicacion) => userService.deleteEntradaCarrito(idDelShow, tipoUbicacion),
}

export const dataComentariosPerfil = {
  component: (item, hasButton, deleteCard) => (
    <Comment item={item} hasButton={hasButton} deleteCard={deleteCard} />
  ),
  datosService: async () => showService.getComentariosPorUsuario(),
  deleteService: async (id) => showService.deleteComentario(id),
}

export const dataEntradasPerfil = {
  component: (item, hasButton, esEntrada, puedeCalificar) => (
    <MediaCard
      item={item}
      hasButton={hasButton}
      esEntrada={true}
      puedeCalificar={item.puedeCalificar}
    />
  ),
  datosService: async () => userService.getEntradasPorUsuario(),
}

export const dataAmigosPerfil = {
  component: (item, hasButton, deleteCard) => (
    <CardAmigo item={item} hasButton={hasButton} deleteCard={deleteCard} />
  ),
  datosService: async () => userService.getAmigos(),
  deleteService: async (id) => userService.deleteAmigo(id),
}

export const dataSugerenciaPerfil = {
  component: (item, hasButton, deleteCard) => (
    <CardAmigo item={item} hasButton={hasButton} deleteCard={deleteCard} agregar={true} />
  ),
  datosService: async () => userService.getAmigosSugeridos(),
  deleteService: async (id) => userService.agregarAmigo(id),
}

export const NochesMagicasRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<LoginView />} />
      <Route path="/" element={<LayoutWrap />}>
        <Route path="shows" element={<Shows data={dataShows} />} />
        <Route path="detalleShow/:idShow" element={<DetalleShow />} />
        <Route
          path="cart"
          element={
            <ProtectedRouteAdmin onlyBuyer={true}>
              <Cart data={dataCart} />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRouteAdmin onlyAdmin={true}>
              <AdminView />
            </ProtectedRouteAdmin>
          }
        />
        {/* Cambiar componente a help */}
        <Route path="help" element={<Cart />} />
        <Route
          path="perfil"
          element={
            <ProtectedRouteAdmin onlyBuyer={true}>
              <PerfilLayout />
            </ProtectedRouteAdmin>
          }
        >
          <Route
            path="entradas"
            element={
              <ProtectedRouteAdmin onlyBuyer={true}>
                <CardGrid
                  data={dataEntradasPerfil}
                  hasButton={false}
                  width={4}
                />
              </ProtectedRouteAdmin>
            }
          />

          <Route
            path="amigos"
            element={
              <ProtectedRouteAdmin onlyBuyer={true}>
                <CardGrid data={dataAmigosPerfil} hasButton={false} width={3} />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="comentarios"
            element={
              <ProtectedRouteAdmin onlyBuyer={true}>
                <CardGrid
                  data={dataComentariosPerfil}
                  hasButton={true}
                  width={4.5}
                />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="sugerencias"
            element={
              <ProtectedRouteAdmin onlyBuyer={true}>
                <CardGrid
                  data={dataSugerenciaPerfil}
                  hasButton={true}
                  width={4.5}
                />
              </ProtectedRouteAdmin>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="" />} />
    </Routes>
  )
}

export const NochesMagicasRouter = () => {
  return (
    <Router>
      <NochesMagicasRoutes />
    </Router>
  )
}
