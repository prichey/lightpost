import React from 'react';
// import PropTypes from 'prop-types';

import { getEmployees } from '../utils/employeesService';

class EmployeeList extends React.Component {
  state = {
    employees: []
  };

  componentDidMount() {
    getEmployees().then(employees => {
      this.setState({ employees });
    });
  }

  render() {
    const { employees } = this.state;

    if (!employees) return null;

    return (
      <ul>
        {employees.map((employee, i) => <li key={i}>{employee.name}</li>)}
      </ul>
    );
  }
}

// EmployeeList.propTypes = {};

export default EmployeeList;
