import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '../../../src/heroes'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('Pruebas en <SearchPage />', () => {
  
  beforeEach(() => jest.clearAllMocks())

  test('should de mostrarse correctamente con valores por defecto', () => {
    const {container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()
  })
  
  test('debe de mostrar a batman y el input con el valor del query string', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox')

    expect(input.value).toBe('batman')

    const img = screen.getByRole('img')
    
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg')
    
    const divNoHero = screen.getByLabelText('alert-danger')

    expect(divNoHero.style.display).toBe('none')
  })

  test('should de mostrar un error si no se encuentra el heroe', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )
    
    const divNoHero = screen.getByLabelText('alert-danger')
    
    expect(divNoHero.style.display).toBeFalsy()
  })
  
  test('should de llamar el navigate a la pantalla nueva', () => {
    const inputValue = 'superman'

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox')
    const form = screen.getByRole('form')
    
    fireEvent.input(input, { target: { name: 'searchText', value: inputValue } })
    fireEvent.submit(form)

    expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)
  })
})