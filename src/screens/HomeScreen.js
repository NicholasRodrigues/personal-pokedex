import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DisplayText, Dd } from '../styles/Typography';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate('Pokedex');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <DisplayText>Welcome to Pokedex</DisplayText>
      </View>
      <TouchableOpacity onPress={handleStart} style={styles.pokeballContainer}>
        <Image
          source={require('../../assets/pokeball.png')}
          style={styles.pokeball}
        />
      </TouchableOpacity>
      <Dd>Press to Start!</Dd>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
  },
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 40,
  },
  pokeballContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 100,
  },
  pokeball: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 75,
  },
});
