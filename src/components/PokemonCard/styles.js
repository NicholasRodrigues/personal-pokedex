import { StyleSheet } from 'react-native';

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

  pokemonImageContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    height: 50,
  },
  pokemonName: {},
});
