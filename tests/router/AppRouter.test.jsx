import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import { AppRouter } from '../../src/router/AppRouter'

describe('Pruebas en <AppRouter />', () => {
  test('should de mostrar el login si no esta autenticado', () => {

    const contextValue = {
      logged: false
    }
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getAllByText('Login').length).toBe(2)
  })

  test('should de mostrar el componente de marvel si esta autenticado', () => {
    const contextValue = {
      logged: true,
      user: {
        id: '123',
        name: 'Fernando Herrera'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider> 
    )

    expect(screen.getByText('Marvel Comics')).toBeTruthy()
    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1)
  })
})