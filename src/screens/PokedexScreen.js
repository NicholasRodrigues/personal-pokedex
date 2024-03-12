import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { fetchPokemonList } from '../api/pokeApi';
import { Container, ListContainer } from '../styles/GlobalStyles';

export default function List({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const loadPokemons = async () => {
    if (isFetching) return;

    setIsFetching(true);
    const pokemons = await fetchPokemonList(offset);
    setPokemonList((prevPokemons) => [...prevPokemons, ...pokemons]);
    setFilteredPokemonList((prevPokemons) => [...prevPokemons, ...pokemons]);
    setOffset(offset + 20);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemonList(filtered);
  }, [searchQuery, pokemonList]);

  const getPokemonIdFromUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  };

  return (
    <Container>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <ListContainer>
        <FlatList
          data={filteredPokemonList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              onPress={() => {
                const pokemonId = getPokemonIdFromUrl(item.url);
                navigation.navigate('Details', { pokemonId });
              }}
            />
          )}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
    </Container>
  );
}
