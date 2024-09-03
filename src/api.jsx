import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Pokemontype({ pokemon }) {
  return (
    <div>
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight} kg</p>
      <p>Tipos:</p>
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

function MiComponente() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150')
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

  return (
    <div>
      <Container>
        <Row>
          {pokemons.map((pokemon, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card onClick={() => handleCardClick(pokemon)} className="h-100" style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Card.Title>{pokemon.name}</Card.Title>
                  <Card.Img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <Card.Text>
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
        <Modal.Header closeButton>
          <Modal.Title>{selectedPokemon ? selectedPokemon.name : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPokemon && (
            <div>
              <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} style={{ width: '100px', height: '100px' }} />
              <Pokemontype pokemon={selectedPokemon} />
              <PokemonMoves pokemon={selectedPokemon}/>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MiComponente;
