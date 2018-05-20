import React from 'react';
// import PropTypes from 'prop-types';
import { AutoSizer, Column, Table } from 'react-virtualized';

import { getEmployees } from '../utils/employeesService';

class EmployeeTable extends React.Component {
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
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={400}
            headerHeight={20}
            rowHeight={30}
            rowCount={employees.length}
            rowGetter={({ index }) => employees[index]}
          >
            <Column label="Name" dataKey="name" width={150} />
            <Column label="Department" dataKey="department" width={150} />
            <Column label="Position" dataKey="position" width={150} />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

// EmployeeTable.propTypes = {};

export default EmployeeTable;
