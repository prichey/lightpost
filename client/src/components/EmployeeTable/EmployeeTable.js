import React from 'react';
// import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import moment from 'moment';
import styled from 'styled-components';

import 'react-table/react-table.css'; // react-table base styles

import { getEmployees } from '../../utils/employeesService';
import { getEmployeeLocationString } from '../../utils/helpers';

import Actions from './Actions';
import EmployeeModal from './EmployeeModal';

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
                    onClick={e => console.log(props)}
                    role="img"
                    aria-label="Delete Employee"
                    title="Delete Employee"
                  >
                    ❌
                  </RowAction>
                </RowActionsWrap>
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
