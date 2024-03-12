import { useState, useEffect } from 'react';
import { View, Text, Share, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Badge from '../components/Badge/index';
import { Button } from '../components/Button/index';
import { Dd } from '../styles/Typography';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TYPE_COLORS = {
  normal: '#C4C4A4',
  fighting: '#D46A5E',
  flying: '#C0B0F5',
  poison: '#B78AB7',
  ground: '#ECD9A5',
  rock: '#CCC08E',
  bug: '#B8C548',
  ghost: '#9A92B9',
  steel: '#C7C7D7',
  fire: '#F7A878',
  water: '#92B7F0',
  grass: '#B4D5BA',
  electric: '#FAE78C',
  psychic: '#FBA3B1',
  ice: '#B3ECEC',
  dragon: '#927BE6',
  dark: '#857870',
  fairy: '#E4B2C5',
  unknown: '#92B3A5',
  shadow: '#696969',
};

const getTypeColor = (type) => TYPE_COLORS[type] || '#97CBAF';

const DetailsScreen = ({ route, navigation }) => {
  const { pokemonId } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const getPokemonDetails = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
      );
      const details = await response.json();
      setPokemonDetails(details);
    } catch (error) {
      console.error('Failed to fetch pokemon details:', error);
    }
  };

  useEffect(() => {
    getPokemonDetails();
  }, [pokemonId]);

  useEffect(() => {
    if (pokemonDetails) {
      navigation.setOptions({
        title: pokemonDetails.name,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#222222',
      });
    }
  }, [pokemonDetails, navigation]);

  const isDetailsLoaded = () =>
    pokemonDetails && pokemonDetails.stats && pokemonDetails.stats.length > 0;

  const onShare = async () => {
    try {
      await Share.share({
        message:
          `Check out this Pokémon's stats! \n\n` +
          `Height: ${pokemonDetails.height} \n` +
          `Weight: ${pokemonDetails.weight} \n` +
          `Base Stats: \n` +
          `HP: ${pokemonDetails.stats[0].base_stat} \n` +
          `Attack: ${pokemonDetails.stats[0].base_stat} \n` +
          `Defense: ${pokemonDetails.stats[0].base_stat}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const renderStat = (statName, value, maxValue) => {
    statName = statName.charAt(0).toUpperCase() + statName.slice(1);

    if (statName === 'Hp' || statName === 'Attack' || statName === 'Defense') {
      return (
        <TableRow key={statName}>
          <TableCell>
            <TableLabel>{statName}</TableLabel>
          </TableCell>
          <TableCell>
            <ProgressBarContainer>
              <ProgressBar width={`${(value / maxValue) * 100}%`} />
            </ProgressBarContainer>
          </TableCell>
          <TableCell>
            <TableValue>{value}</TableValue>
          </TableCell>
        </TableRow>
      );
    }
  };
  const primaryType = pokemonDetails?.types?.[0]?.type?.name || 'grass';

  return (
    <DetailsContainer type={primaryType}>
      {isDetailsLoaded() && (
        <>
          <View style={styles.badgeContainer}>
            {pokemonDetails.types.map((typeInfo) => (
              <Badge key={typeInfo.slot} type={typeInfo.type.name}>
                typeInfo.type.name
              </Badge>
            ))}
          </View>
          <PokemonImageContainer>
            <PokemonImage
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
              }}
            />
          </PokemonImageContainer>
          <PokemonDetailsContainer>
            <InfoContainer>
              <InfoBlock>
                <InfoNumber>{pokemonDetails.height / 10} m</InfoNumber>
                <InfoLabel>HEIGHT</InfoLabel>
              </InfoBlock>
              <Divider />
              <InfoBlock>
                <InfoNumber>{pokemonDetails.weight / 10} kg</InfoNumber>
                <InfoLabel>WEIGHT</InfoLabel>
              </InfoBlock>
            </InfoContainer>
            <StatsSection>
              <Dd>Base stats</Dd>
              <Table>
                {pokemonDetails.stats.map((stat) =>
                  renderStat(stat.stat.name, stat.base_stat, 255)
                )}
              </Table>
            </StatsSection>
            <ButtonContainer>
              <Button onPress={onShare}>
                <ShareButtonText>Compartilhar</ShareButtonText>
              </Button>
            </ButtonContainer>
          </PokemonDetailsContainer>
        </>
      )}
      {!isDetailsLoaded() && <Text>Loading...</Text>}
    </DetailsContainer>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: 16,
    flex: 1,
    gap: 10,
  },
});

const DetailsContainer = styled.View`
  flex: 1;
  background-color: ${({ type }) => getTypeColor(type)};
  justify-content: flex-end;
`;

const ButtonContainer = styled.View`
  align-items: center;
`;

const Table = styled.View`
  flex-direction: column;
  width: ${screenWidth * 0.9}px;
`;

const TableRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0; 
  padding-right: 5px;

`;

const TableCell = styled.View`
flex-direction: column;
align-items: center;
  justify-content: center;
  padding-left: 0;
`;

const TableLabel = styled.Text`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.05em;
  text-align: left;


  width: 60px;
`;

const TableValue = styled.Text`

font-family: Open Sans;
font-size: 14px;
font-weight: 600;
line-height: 19px;
letter-spacing: 0.05em;
text-align: left;
  text-align: right;
`;

const ProgressBarContainer = styled.View`
  height: 6px; 
  background-color: #E5E5E5; 
  border-radius: 3px; 
  width: 190px;
padding-right: 0;


`;

const ProgressBar = styled.View`
  background-color: #478070; 
  height: 100%;
  border-radius: 3px;
  width: ${(props) => `${props.width}`}; 

`;

const InfoNumber = styled.Text`
  font-family: 'Overpass';
  font-size: 32px;
  font-weight: 600;
  line-height: 41px;
  letter-spacing: 0;
  text-align: center;
  color: #000000;
`;

const InfoLabel = styled.Text`
  font-family: 'Open Sans';
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-align: center;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  padding: 20px;
  gap: 2rem;
`;

const InfoBlock = styled.View`
  align-items: center;
`;

const Divider = styled.View`
  height: 60%; 
  width: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  align-self: center;
`;

const PokemonImage = styled.Image`
  width: 200px;
  height: 200px;
  align-self: center;
`;

const PokemonImageContainer = styled.View`
  position: absolute;
  top: ${screenHeight * 0.11}px;;
  z-index: 10;
  width: 200px;
  height: 200px;
  align-self: center;
`;

const PokemonDetailsContainer = styled.View`

  background-color: #FFFFFF;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 30px;
  margin-top: 100px;
  margin-left: 0;
  padding-left: 0;
  z-index: 5; 
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 30px;
  height: ${screenHeight * 0.6}px;
`;

const StatsSection = styled.View`
  padding: 20px;
  gap: 0.5rem;
  align-items: start;
`;

const ShareButtonText = styled.Text`
  color: #FFFFFF;

  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;

`;
