import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { getHeroesByName } from '../helpers'

export const useSearch = () => {

  const location = useLocation()
  
  const { q = '' } = queryString.parse(location.search)
  
  const heroes = useMemo(() => getHeroesByName(q), [q])

  const showSearch = (q.length === 0)
  
  const showError = (q.length > 0) && heroes.length === 0

  return {
    heroes,
    showSearch,
    showError, 
    q
  }
}