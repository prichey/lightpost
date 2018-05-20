import React from 'react';
import EmployeeList from './EmployeeList';

class App extends React.Component {
  render() {
    return (
      <main>
        <h1>Employees!</h1>
        <EmployeeList />
      </main>
    );
  }
}

export default App;
