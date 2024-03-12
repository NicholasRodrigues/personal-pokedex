import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  background-color : #478070;
  padding: 10px 20px;
  border-radius: 8px;
  align-items: center;
  justify-content:center;
  height: 40px;
  width: 223px;
`;

export const ButtonText = styled.Text`
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
`;

export default ({ onPress, title }) => (
  <Button onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </Button>
);
