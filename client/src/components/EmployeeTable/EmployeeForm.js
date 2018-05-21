import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { addEmployee } from '../../utils/employeesService';

import Button from '../common/Button';

const ButtonsWrap = styled.div`
  margin-top: 2rem;
  text-align: right;
`;

const StyledButton = Button.extend`
  display: inline-block;
  margin-left: 1em;
`;

const Heading = styled.h2`
  font-size: 36px;
  margin-bottom: 0.5em;
`;

const InputWrap = styled.div`
  margin-bottom: 1em;
`;
const Form = styled.form``;
const Label = styled.label`
  font-size: 18px;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5em;
  font-size: 18px;
`;

class EmployeeForm extends React.Component {
  state = {
    employee: {
      name: '',
      startDate: '',
      department: '',
      position: ''
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // set state to employee if passed in
    return null;
  }

  handleFormSubmit = e => {
    const { employee } = this.state;
    const { handleAddSuccess, closeModal } = this.props;
    console.log(employee);

    e.preventDefault();

    // TODO: client side validation

    addEmployee(employee)
      .then(handleAddSuccess)
      .catch(err => {
        console.log(err);
      })
      .finally(closeModal);
  };

  handleFieldChange = (e, v) => {
    this.setState({
      employee: {
        ...this.state.employee,
        [e.target.name]: e.target.value
      }
    });
  };

  handleModalClose = e => {
    const { closeModal } = this.props;
    closeModal();
    this.setState();
  };

  render() {
    const { actionIsAdd, selectedEmployee, closeModal } = this.props;
    const employee = this.state;

    if (!actionIsAdd && !selectedEmployee) {
      // todo: remove?
      closeModal();
      throw new Error('must pass a selected employee to edit');
    }

    return (
      <React.Fragment>
        <Heading>{actionIsAdd ? 'Add New Employee' : 'Edit Employee'}</Heading>
        <Form onSubmit={this.handleFormSubmit}>
          <InputWrap>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={employee.name}
              onChange={this.handleFieldChange}
            />
          </InputWrap>
          <InputWrap>
            <Label htmlFor="department">Department</Label>
            <Input
              type="text"
              name="department"
              id="department"
              value={employee.department}
              onChange={this.handleFieldChange}
            />
          </InputWrap>
          <InputWrap>
            <Label htmlFor="position">Position</Label>
            <Input
              type="text"
              name="position"
              id="position"
              value={employee.position}
              onChange={this.handleFieldChange}
            />
          </InputWrap>
          <ButtonsWrap>
            <StyledButton color="green">Save</StyledButton>
            <StyledButton color="red" onClick={closeModal}>
              Cancel
            </StyledButton>
          </ButtonsWrap>
        </Form>
      </React.Fragment>
    );
  }
}

EmployeeForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  actionIsAdd: PropTypes.bool.isRequired,
  selectedEmployee: PropTypes.object,
  handleAddSuccess: PropTypes.func.isRequired
};

export default EmployeeForm;
