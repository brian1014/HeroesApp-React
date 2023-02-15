import { useLocation, useNavigate } from 'react-router-dom'
import { HeroCard } from '../components'
import { useForm } from '../../hooks'
// import { useSearch } from '../hooks'
import queryString from 'query-string'
import { getHeroesByName } from '../helpers'
import { useMemo } from 'react'

export const SearchPage = () => {

  // const { heroes, showError, showSearch, q } = useSearch()
  const location = useLocation()
  
  const { q = '' } = queryString.parse(location.search)
  
  const heroes = useMemo(() => getHeroesByName(q), [q])

  const showSearch = (q.length === 0)
  
  const showError = (q.length > 0) && heroes.length === 0
  
  const navigate = useNavigate()

  const { searchText, onInputChange } = useForm({
    searchText: q
  })

  const onSearchSubmit = (event) => {
    event.preventDefault()
    
    // if (searchText.trim() <= 1) return

    navigate(`?q=${searchText}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form aria-label='form' onSubmit={onSearchSubmit}>
            <input 
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button
              className="btn btn-outline-primary mt-1"
            >
              Search
            </button>
          </form>
        </div>
        
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/* {(q === '')
            ? <div className="alert alert-primary">Search a Hero</div>
            : (heroes.length === 0) && <div className="alert alert-danger">No hero with <b>{q}</b></div>
          } */}

          <div 
            className="alert alert-primary animate__animated animate__fadeIn" 
            style={{ display: showSearch ? '' : 'none'}}>
            Search a Hero
          </div>

          <div 
            className="alert alert-danger animate__animated animate__fadeIn" 
            style={{ display: showError ? '' : 'none'}}
            aria-label='alert-danger'
            >
            No hero with <b>{q}</b>
          </div>
          
          {heroes.map(hero => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  )
}
