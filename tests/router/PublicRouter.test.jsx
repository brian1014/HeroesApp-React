import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import { PublicRouter } from '../../src/router/PublicRouter'

describe('Pruebas <PublicRouter />', () => {
  test('should de mostrar el children si no esta autenticado', () => {

    render(
      <AuthContext.Provider value={{ logged: false }}>
        <PublicRouter>
          <h1>Ruta Publica</h1>
        </PublicRouter>
      </AuthContext.Provider>
    )
    
    expect(screen.getByText('Ruta Publica')).toBeTruthy()
  })

  test('should de navegar si esta autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        name: ' Strinder',
        id: 'ABC123'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>

          <Routes>
            
            <Route path='login' element={
              <PublicRouter>
                <h1>Ruta Publica</h1>
              </PublicRouter>
            } />
            <Route path='marvel' element={<h1>Pagina Marvel</h1>} />
          
          </Routes>

        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText('Pagina Marvel')).toBeTruthy()
  })
})