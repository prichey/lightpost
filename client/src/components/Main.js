import React from 'react';
import styled from 'styled-components';

import EmployeeTable from './EmployeeTable';

const Wrap = styled.main`
  // margin-top: 4rem;
`;

class Main extends React.Component {
  render() {
    return (
      <Wrap>
        <EmployeeTable />
      </Wrap>
    );
  }
}

export default Main;
