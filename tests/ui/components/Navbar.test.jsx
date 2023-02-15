import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../src/auth'
import { Navbar } from '../../../src/ui'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('Pruebas en <Navbar />', () => {
  
  const contextValue = {
    logged: true,
    user: {
      id: 'ABC',
      name: 'Fernando Herrera'
    },
    logout: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks())

  test('should de mostrar el nombre del usuario logueado', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText(contextValue.user.name)).toBeTruthy()
  })

  test('should de llamar el logout y navigate cuando se da click en el boton', () => {

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    const btnLogout = screen.getByRole('button')
    fireEvent.click(btnLogout)
    
    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockUseNavigate).toHaveBeenCalledWith('/login', { 'replace': true })
  })

})