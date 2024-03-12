import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { H3 } from '../../styles/Typography.js';

const PokemonCard = ({ pokemon, onPress }) => {
  const pokemonId = getPokemonIdFromUrl(pokemon.url);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.pokemonImageContainer}>
          <Image
            style={styles.pokemonImage}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
            }}
          />
        </View>
        <H3 style={styles.pokemonName}>{pokemon.name}</H3>
        <Image
          style={styles.pokeballImage}
          source={require('../../../assets/GreenBall.png')} 
        />
      </TouchableOpacity>
    </View>
  );
};

const getPokemonIdFromUrl = (url) => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
};

export default PokemonCard;

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f2f2f2',
    paddingTop: 16,
    height: 80,
    margin: 0,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderRadius: 8,
    height: 60,
    elevation: 5,
  },
  pokemonImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    marginTop: 0,
    marginLeft: 10,
  },
  pokeballImage: {
    width: 40, 
    height: 40, 
    position: 'absolute', 
    right: 15, 
    bottom: 10, 
  },

  pokemonImageContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    height: 50,
  },
  pokemonName: {},
});
