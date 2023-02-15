import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import { PrivateRouter } from '../../src/router/PrivateRouter'

describe('Pruebas en <PrivateRouter />', () => {
  
  test('should de mostrar el children si no esta autenticado', () => {

    Storage.prototype.setItem = jest.fn()

    const contextValue = {
      logged: true,
      user: {
        id: 'abc',
        name: 'Juan Carlos'
      }
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRouter>
            <h1>Ruta Privada</h1>
          </PrivateRouter>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    
    expect(screen.getByText('Ruta Privada')).toBeTruthy()

    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman')
  })
})