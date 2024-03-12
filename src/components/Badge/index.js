import styled from 'styled-components/native';

const TYPE_COLORS = {
  normal: '#BFA06A',
  fighting: '#B3472D',
  flying: '#8997B8',
  poison: '#8E6990',
  ground: '#C4A76A',
  rock: '#9C8E7E',
  bug: '#809961',
  ghost: '#786C8A',
  steel: '#88929D',
  fire: '#D67E4B',
  water: '#6796A0',
  grass: '#7E9968',
  electric: '#C4B652',
  psychic: '#C4849A',
  ice: '#98C1C6',
  dragon: '#6361A7',
  dark: '#564B3C',
  fairy: '#C4849A',
  unknown: '#527A6E',
  shadow: '#434343',
};

function getTypeColor(type) {
  return TYPE_COLORS[type.toLowerCase()] || '#68A090';
}

const Badge = styled.View`
  background-color: ${({ type }) => getTypeColor(type)};
  padding: 5px 10px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 57ox;
`;

export const BadgeText = styled.Text`
  color: white;
  font-size: 12px;
  text-transform: capitalize;
`;

export default ({ type }) => (
  <Badge type={type}>
    <BadgeText>{type}</BadgeText>
  </Badge>
);
