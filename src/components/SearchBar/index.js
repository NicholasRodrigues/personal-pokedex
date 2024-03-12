import { Container, SearchInput } from './styles';
import StyleSheet from 'styled-components/native';

export default function SearchBar({ value, onChange }) {
  return (
    <Container>
      <SearchInput
        value={value}
        onChangeText={onChange}
        placeholder="Search Pokémon"
        placeholderTextColor="black"
        underlineColorIos="black"
      />
    </Container>
  );
}
