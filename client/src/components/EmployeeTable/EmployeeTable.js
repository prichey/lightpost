import React from 'react';
// import PropTypes from 'prop-types';
import { AutoSizer, Column, Table } from 'react-virtualized';

import { getEmployees } from '../../utils/employeesService';

import Actions from './Actions';
import AddEmployeeModal from './AddEmployeeModal';

class EmployeeTable extends React.Component {
  state = {
    employees: [],
    addModalIsOpen: false
  };

  componentDidMount() {
    getEmployees().then(employees => {
      this.setState({ employees });
    });
  }

  openAddModal = e => {
    console.log('openAddModal');

    this.setState({
      addModalIsOpen: true
    });
  };

  closeAddModal = () => {
    this.setState({
      addModalIsOpen: false
    });
  };

  clearFilters = e => {
    console.log('clearFilters');
  };

  render() {
    const { employees, addModalIsOpen } = this.state;

    if (!employees) return null;

    return (
      <React.Fragment>
        <Actions
          openAddModal={this.openAddModal}
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
        <AddEmployeeModal
          isOpen={addModalIsOpen}
          closeModal={this.closeAddModal}
        />
      </React.Fragment>
    );
  }
}

// EmployeeTable.propTypes = {};

export default EmployeeTable;
