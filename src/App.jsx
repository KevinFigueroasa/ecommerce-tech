import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductsDetails from './pages/ProductsDetails'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductsThunk } from './store/slices/products.slice'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/protectedRoutes'

function App() {

  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.isLoading) // estoy accediendo al estado con nombre isLoading

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    <div className="App">
      <HashRouter>
        <Navigation />
        {isLoading && <LoadingScreen />} {/*Si isLoading es False, que no se muestre la pantalla de carga */}
        <Container className='mt-5' fluid>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductsDetails />} />
            <Route path='/login' element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases />} />
            </Route>

          </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App
