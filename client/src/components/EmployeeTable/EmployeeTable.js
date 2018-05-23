import React from 'react';
// import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import moment from 'moment';
import styled from 'styled-components';

import 'react-table/react-table.css'; // react-table base styles

import { getEmployees } from '../../utils/employeesService';
import { getEmployeeLocationString } from '../../utils/helpers';
import { EMPLOYEE_ACTIONS } from '../../utils/constants';

import Actions from './Actions';
import EmployeeModal from './EmployeeModal';
import RemoveModal from './RemoveModal';

const RowActionsWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const RowAction = styled.span`
  cursor: pointer;
  margin: 0 0.25em;
  padding: 0 0.25em;
`;

class EmployeeTable extends React.Component {
  state = {
    employees: [],
    selectedEmployee: null,
    currentAction: null
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
    this.setState({
      currentAction: EMPLOYEE_ACTIONS.ADD
    });
  };

  closeAddModal = () => {
    this.setState({
      currentAction: null
    });
  };

  clearFilters = e => {
    console.log('clearFilters');
  };

  handleAddSuccess = employees => {
    this.setState({ employees });
  };

  handleRemoveRequest = employee => {
    this.setState({
      selectedEmployee: employee.original,
      currentAction: EMPLOYEE_ACTIONS.REMOVE
    });
  };

  handleRemoveSuccess = removedEmployee => {
    const { employees } = this.state;

    // filter local employees to exclude removed employee
    this.setState({
      employees: employees.filter(e => e.id !== removedEmployee.id)
    });
  };

  render() {
    const { employees, currentAction, selectedEmployee } = this.state;

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
              id: 'location',
              accessor: e => e.location && getEmployeeLocationString(e)
            },
            {
              Header: 'Start Date',
              id: 'startDate',
              accessor: e => e.startDate && moment(e.startDate).format('L'),
              maxWidth: 110
            },
            {
              Header: 'Actions',
              sortable: false,
              maxWidth: 110,
              Cell: props => (
                <RowActionsWrap>
                  <RowAction
                    className="number"
                    onClick={e => console.log(props)}
                    role="img"
                    aria-label="Edit Employee"
                    title="Edit Employee"
                  >
                    ✏️
                  </RowAction>
                  <RowAction
                    className="number"
                    onClick={() => this.handleRemoveRequest(props)}
                    role="img"
                    aria-label="Remove Employee"
                    title="Remove Employee"
                  >
                    ❌
                  </RowAction>
                </RowActionsWrap>
              )
            }
          ]}
        />
        <EmployeeModal
          isOpen={
            currentAction === EMPLOYEE_ACTIONS.ADD ||
            currentAction === EMPLOYEE_ACTIONS.EDIT
          }
          closeModal={this.closeAddModal}
          actionIsAdd={currentAction === EMPLOYEE_ACTIONS.ADD}
          selectedEmployee={selectedEmployee}
          handleAddSuccess={this.handleAddSuccess}
        />
        <RemoveModal
          isOpen={currentAction === EMPLOYEE_ACTIONS.REMOVE}
          closeModal={this.closeAddModal}
          selectedEmployee={selectedEmployee}
          handleRemoveSuccess={this.handleRemoveSuccess}
        />
      </React.Fragment>
    );
  }
}

// EmployeeTable.propTypes = {};

export default EmployeeTable;
