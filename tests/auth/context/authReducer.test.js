import { authReducer, types } from '../../../src/auth'

describe('Pruebas en el authReduces', () => {

  const initalState = {
    logged: false
  }
  test('should de retonar el estado por defecto', () => {
    
    const newState = authReducer(initalState, {})
    expect(newState).toBe(initalState)
  })

  test('should de llamar el login autenticar y establecer usuario', () => {
    const action = {
      type: types.login,
      payload: { id: 'ABC', name: 'Fernando Herrera' }
    }

    const newState = authReducer(initalState, action)
    expect(newState).toEqual({
      logged: true,
      user: action.payload
    })
  })
  
  test('should de llamar el logout borrar el name del usuario y logged en false', () => {
    const action = { type: types.logout }

    const newState = authReducer(initalState, action)

    expect(newState).toEqual({
      logged: false
    })
  })

})