import React from 'react';
// import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import moment from 'moment';
import styled from 'styled-components';

import 'react-table/react-table.css'; // react-table base styles
import '../../styles/react-table.css'; // overrides

import { getEmployees } from '../../utils/employeesService';
import { getEmployeeLocationString } from '../../utils/helpers';
import { EMPLOYEE_ACTIONS } from '../../utils/constants';

import EmployeeModal from './EmployeeModal';
import RemoveModal from './RemoveModal';
import Button from '../common/Button';

const RowActionsWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const RowAction = styled.span`
  cursor: pointer;
  margin: 0 0.25em;
  padding: 0 0.25em;
`;

const ButtonWrap = styled.div`
  margin-bottom: 2em;
`;

const Table = ({ employees, handleUpdateRequest, handleRemoveRequest }) => (
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
        maxWidth: 110,
        sortMethod: (a, b) => {
          return moment(a) - moment(b);
        }
      },
      {
        Header: 'Actions',
        sortable: false,
        maxWidth: 110,
        Cell: props => (
          <RowActionsWrap>
            <RowAction
              className="number"
              onClick={() => handleUpdateRequest(props)}
              title="Update Employee"
            >
              <span role="img" aria-label="Update Employee">
                ✏️
              </span>
            </RowAction>
            <RowAction
              className="number"
              onClick={() => handleRemoveRequest(props)}
              role="img"
              aria-label="Remove Employee"
              title="Remove Employee"
            >
              <span role="img" aria-label="Update Employee">
                ❌
              </span>
            </RowAction>
          </RowActionsWrap>
        )
      }
    ]}
  />
);

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
      selectedEmployee: null, // reset to make sure we're not editing a formerly selected employee
      currentAction: EMPLOYEE_ACTIONS.ADD
    });
  };

  closeAllModals = () => {
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

  handleUpdateRequest = employee => {
    this.setState({
      selectedEmployee: employee.original,
      currentAction: EMPLOYEE_ACTIONS.EDIT
    });
  };

  handleUpdateSuccess = updatedEmployee => {
    const { employees } = this.state;
    const updatedEmployeeIndex = employees.findIndex(
      e => e.id === updatedEmployee.id
    );

    // update in-state employee
    // this is a little ugly but seems like a fairly common redux pattern and I think reads intuitively
    this.setState({
      employees: [
        ...employees.slice(0, updatedEmployeeIndex),
        updatedEmployee,
        ...employees.slice(updatedEmployeeIndex + 1)
      ]
    });
  };

  render() {
    const { employees, currentAction, selectedEmployee } = this.state;

    return (
      <React.Fragment>
        {/* <Actions
          openAddModal={this.openAddModal}
          clearFilters={this.clearFilters}
        /> */}
        <ButtonWrap>
          <Button onClick={this.openAddModal} color="green">
            Add Employee
          </Button>
        </ButtonWrap>
        <Table
          employees={employees}
          handleUpdateRequest={this.handleUpdateRequest}
          handleRemoveRequest={this.handleRemoveRequest}
        />
        <EmployeeModal
          isOpen={
            currentAction === EMPLOYEE_ACTIONS.ADD ||
            currentAction === EMPLOYEE_ACTIONS.EDIT
          }
          closeModal={this.closeAllModals}
          actionIsAdd={currentAction === EMPLOYEE_ACTIONS.ADD}
          selectedEmployee={selectedEmployee}
          handleAddSuccess={this.handleAddSuccess}
          handleUpdateSuccess={this.handleUpdateSuccess}
        />
        <RemoveModal
          isOpen={currentAction === EMPLOYEE_ACTIONS.REMOVE}
          closeModal={this.closeAllModals}
          selectedEmployee={selectedEmployee}
          handleRemoveSuccess={this.handleRemoveSuccess}
        />
      </React.Fragment>
    );
  }
}

// EmployeeTable.propTypes = {};

export default EmployeeTable;
