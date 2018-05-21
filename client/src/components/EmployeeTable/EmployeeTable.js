import React from 'react';
// import PropTypes from 'prop-types';
import { AutoSizer, Column, Table } from 'react-virtualized';

import { getEmployees } from '../../utils/employeesService';

import Actions from './Actions';
import EmployeeModal from './EmployeeModal';

class EmployeeTable extends React.Component {
  state = {
    employees: [],
    selectedEmployee: null,
    modalIsOpen: false,
    actionIsAdd: true // edit if false
  };

  componentDidMount() {
    getEmployees().then(employees => {
      this.setState({ employees });
    });
  }

  openAddModal = e => {
    console.log('openAddModal');

    this.setState({
      modalIsOpen: true
    });
  };

  closeAddModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  clearFilters = e => {
    console.log('clearFilters');
  };

  handleAddSuccess = employees => {
    this.setState({ employees });
  };

  render() {
    const {
      employees,
      modalIsOpen,
      actionIsAdd,
      selectedEmployee
    } = this.state;

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
        <EmployeeModal
          isOpen={modalIsOpen}
          closeModal={this.closeAddModal}
          actionIsAdd={actionIsAdd}
          selectedEmployee={selectedEmployee}
          handleAddSuccess={this.handleAddSuccess}
        />
      </React.Fragment>
    );
  }
}

// EmployeeTable.propTypes = {};

export default EmployeeTable;
