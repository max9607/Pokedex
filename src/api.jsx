import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Pokemontype({ pokemon }) {
  return (
    <div >
      <p>height: {pokemon.height}</p>
      <p>weight: {pokemon.weight} kg</p>
      <p>Types:</p>
      <ul>
        {pokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
    </div>
  );
}

function PokemonMoves({pokemon}){
    return(
    <div>
      <p>moves:</p>
      <ul>
        {pokemon.moves.slice(0,4).map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
    </div>
    )
}
const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

function MiComponente() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [filter, setFilter] = useState("");
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=500')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la llamada a la API');
        }
        return response.json();
      })
      .then((data) => {
        const pokemonDetails = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );
        return Promise.all(pokemonDetails);
      })
      .then((details) => {
        setPokemons(details);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setModalShow(true);
  };
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const filteredPokemons = pokemons.filter(pokemon => {
    return (
      pokemon.name.toLowerCase().includes(filterName.toLowerCase()) &&
      (filterType === '' || pokemon.types.some(type => type.type.name === filterType))
    );
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px', padding: '0 15px' }}>
      <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          style={{ padding: "10px", width: "100%", maxWidth: "500px", boxSizing: 'border-box', marginBottom: '10px' }}
        />
      </div>
      
      <Button onClick={() => setFilterType(filterType ? '' : 'fire')} style={{backgroundColor:'#EE8130', borderColor:'#EE8130'}}>Fire</Button>
      <Button onClick={() => setFilterType(filterType ? '' : 'water')} style={{backgroundColor:'#6390F0', borderColor:'#6390F0',marginLeft:'5px'}}>Water</Button>
      <Container className="container-custom">
        <Row> 
          {filteredPokemons.map((pokemon, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card onClick={() => handleCardClick(pokemon)} className="h-100" style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Card.Title className="card-title-custom" style={{ backgroundColor: typeColors[pokemon.types[0].type.name] ,borderRadius:'10px',minHeight:'30px'}}>{pokemon.name}</Card.Title>
                  <Card.Img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <Card.Text className="card-text-custom">
                    <a target="_blank" rel="noopener noreferrer">Altura: {pokemon.height} </a>
                    <br />
                    <a target="_blank" rel="noopener noreferrer">Peso: {pokemon.weight} kg</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title >{selectedPokemon ? selectedPokemon.name : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          {selectedPokemon && (
            <div className='divpoke'>
              <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} style={{ width: '250px', height: '250px' }} />
              <div >
              <Pokemontype pokemon={selectedPokemon} />
              <PokemonMoves pokemon={selectedPokemon}/>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MiComponente;
