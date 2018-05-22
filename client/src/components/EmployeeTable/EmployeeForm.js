import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/datepicker.css'; // overrides

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
  margin-bottom: 0.25em;
  display: block;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5em;
  font-size: 18px;
  height: 2.5em;
  background: #f8f8f8;
  border: 1px solid #a6a6a6;
  border-radius: 4px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  font-size: 18px;
  height: 2.5em;
`;

const Option = styled.option`
  padding: 0.5em;
`;

class EmployeeForm extends React.Component {
  state = {
    employee: {
      name: '',
      startDate: moment(),
      department: '',
      position: '',
      location: '0',
      remoteLocation: ''
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // set state to employee if passed in
    return null;
  }

  handleFormSubmit = e => {
    const { employee } = this.state;
    const { handleAddSuccess, closeModal } = this.props;

    e.preventDefault();

    // TODO: client side validation

    addEmployee(employee)
      .then(res => {
        if (res.errors.length) {
          console.log(res.errors);
          return;
        }

        return handleAddSuccess(res.data);
      })
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

  handleDatePickerChange = date => {
    this.setState({
      employee: {
        ...this.state.employee,
        startDate: date
      }
    });
  };

  render() {
    const { actionIsAdd, selectedEmployee, closeModal } = this.props;
    const { employee } = this.state;

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
          <InputWrap>
            <Label htmlFor="location">Location</Label>
            <Select
              value={employee.location}
              onChange={this.handleFieldChange}
              name="location"
              id="location"
            >
              <Option value="0">New York City</Option>
              <Option value="1">Beirut</Option>
              <Option value="2">Remote</Option>
            </Select>
          </InputWrap>
          {employee.location === '2' && (
            <InputWrap>
              <Label htmlFor="remoteLocation">Remote Location</Label>
              <Input
                type="text"
                name="remoteLocation"
                id="remoteLocation"
                value={employee.remoteLocation}
                onChange={this.handleFieldChange}
              />
            </InputWrap>
          )}
          <InputWrap>
            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker
              customInput={<Input />}
              selected={employee.startDate}
              popperPlacement="top"
              onChange={this.handleDatePickerChange}
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
