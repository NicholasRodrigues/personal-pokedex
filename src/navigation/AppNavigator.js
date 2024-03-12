import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import List from '../components/List/index';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

const blackBackImage = () => (
  <Image
    source={require('../../assets/BlackArrow.png')}
    style={{ width: 20, height: 20 }}
  />
);

const whiteBackImage = () => (
  <Image
    source={require('../../assets/WhiteArrow.png')}
    style={{ width: 10, height: 10, padding: 10, margin: 10 }}
  />
);

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        height: 100,
        backgroundColor: '#478070',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      cardStyle: { backgroundColor: '#FFFFFF' },
      headerBackImage: blackBackImage,
    }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Pokedex"
      component={List}
      options={{
        headerStyle: {
          backgroundColor: '#478070',
          elevation: 4,
          shadowOpacity: 0.3,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackImage: whiteBackImage,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={({ route }) => ({
        title: route.params.pokemon?.name,
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontFamily: 'Overpass',
          fontSize: 20,
          fontWeight: '600',
          lineHeight: 25,
        },
      })}
    />
  </Stack.Navigator>
);

export default AppNavigator;
