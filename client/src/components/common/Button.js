import styled from 'styled-components';

// normally I'd have a more robust system of color vars
// but since buttons are the only place they're used, I figured it's okay to keep here
// these are bootstrappy, sorry, I don't claim to be a designer
const getBackgroundFromProp = colorName => {
  switch (colorName && colorName.toLowerCase()) {
    case 'green':
      return '#28a745';
    case 'purple':
      return '#6A21Fa';
    case 'red':
      return '#dc3545';
    case 'blue':
    default:
      // blue is default
      return '#007bff';
  }
};

const Button = styled.button`
  padding: 1rem;
  background: ${props => getBackgroundFromProp(props.color)};
  border: none;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

export default Button;
