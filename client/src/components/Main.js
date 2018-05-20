import React from 'react';
import styled from 'styled-components';

import EmployeeList from './EmployeeList';

const Wrap = styled.main`
  // margin-top: 4rem;
`;

class Main extends React.Component {
  render() {
    return (
      <Wrap>
        <EmployeeList />
      </Wrap>
    );
  }
}

export default Main;
