import React from 'react';
// import PropTypes from 'prop-types';
import { AutoSizer, Column, Table } from 'react-virtualized';

import { getEmployees } from '../../utils/employeesService';

import Actions from './Actions';

class EmployeeTable extends React.Component {
  state = {
    employees: []
  };

  componentDidMount() {
    getEmployees().then(employees => {
      this.setState({ employees });
    });
  }

  openCreateModal = e => {
    console.log('openCreateModal');
  };

  clearFilters = e => {
    console.log('clearFilters');
  };

  render() {
    const { employees } = this.state;

    if (!employees) return null;

    return (
      <React.Fragment>
        <Actions
          openCreateModal={this.openCreateModal}
          clearFilters={this.clearFilters}
        />
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
      </React.Fragment>
    );
  }
}

// EmployeeTable.propTypes = {};

export default EmployeeTable;
