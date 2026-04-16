import { useEffect, useState } from "react";
import api from './services/api';


function App(){
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);
  const [error, setError] = useState('');

  async function fetchShows(searchTerm){
    try {
      setError("")

      const response = await api.get(searchTerm);
      setShows(response.data);
    } catch (err) {
      setError('Não foi possivel carregar os dados da API', err)
    } finally {}
  }

  useEffect(() => {
    fetchShows(query);
  }, [])

  function handlerSubmit(event) {
    event.preventDefault();
    setError("")
    if (!query.trim()) {
      setError("Digite um titulo para pesquisar.");
      return;
    }

    fetchShows(query)
  }

  return (
    <main className="container">
      <h1>Consumo de API com React</h1>
      {/*Listar o retorno da API*/}
      <form onSubmit={handlerSubmit} className="search-form">
        <label htmlFor="query">Pesquisar por título</label>
        <input 
        id="query"
        type="text"
        value={query}
        onChange={(event => setQuery(event.target.value))} 
        placeholder="Ex: star wars"
      />
      <button type="submit">Pesquisar</button>

      </form>
      {error && <p>{error}</p>}

      <ul className='show-list'>
        {shows.map((item) => (
          <li key={item.show.id} className="show-card">
            <h2>{item.show.name}</h2>
            {item.show.image?.medium ?(
              <img
              src={item.show.image.medium}
              alt={`Capa de ${item.show.name}`}
              />
            ) : (
              <div className="no-image">Sem Imagens</div>
            )}

            <p>
              <strong>Link: </strong>
              <a href={item.show.url} target="_blank" rel="noreferrer">
                Acessar página do Card
              </a>
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App;