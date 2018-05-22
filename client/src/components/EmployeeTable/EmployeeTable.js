import React from 'react';
// import PropTypes from 'prop-types';
import ReactTable from 'react-table';

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
    getEmployees().then(res => {
      if (res.errors.length) {
        console.log(res.errors);
        return;
      }

      this.setState({ employees: res.data });
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
        <ReactTable
          // showPagination={false}
          showPaginationBottom={true}
          showPageSizeOptions={false}
          className="-striped"
          defaultPageSize={15}
          data={employees}
          columns={[
            {
              Header: 'Name',
              accessor: 'name'
            },
            {
              Header: 'Department',
              accessor: 'department'
            },
            {
              Header: 'Position',
              accessor: 'position'
            },
            {
              Header: 'Location',
              accessor: 'location'
            },
            {
              Header: 'Start Date',
              accessor: 'startDate'
            },
            {
              Header: 'Actions',
              // minWidth: 30,
              Cell: props => (
                <React.Fragment>
                  <span
                    className="number"
                    onClick={e => console.log(props)}
                    role="img"
                    aria-label="Edit Employee"
                  >
                    ✏️
                  </span>
                  <span
                    className="number"
                    onClick={e => console.log(props)}
                    role="img"
                    aria-label="Delete Employee"
                  >
                    ❌
                  </span>
                </React.Fragment>
              )
            }
          ]}
        />
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
