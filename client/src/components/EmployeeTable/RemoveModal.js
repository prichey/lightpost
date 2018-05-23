import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from '../common/Modal';
import Button from '../common/Button';

import { removeEmployee } from '../../utils/employeesService';

const Heading = styled.h3`
  font-size: 28px;
  margin-bottom: 1em;
  line-height: 1.5em;
  font-weight: normal;
  text-align: center;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;

const RemoveContent = ({
  selectedEmployee,
  closeModal,
  handleConfirmClick
}) => (
  <React.Fragment>
    <Heading>
      You are about to remove employee: <Bold>{selectedEmployee.name}</Bold>
    </Heading>
    <ButtonsWrap>
      <Button color="green" onClick={handleConfirmClick}>
        Confirm
      </Button>
      <Button color="red" onClick={closeModal}>
        Cancel
      </Button>
    </ButtonsWrap>
  </React.Fragment>
);

class RemoveModal extends React.Component {
  handleConfirmClick = () => {
    const { selectedEmployee, handleRemoveSuccess, closeModal } = this.props;

    removeEmployee(selectedEmployee.id)
      .then(res => {
        if (res.errors.length || !res.data.length) {
          console.log(res.errors);
          return;
        }

        const removedEmployee = res.data[0];
        return handleRemoveSuccess(removedEmployee);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(closeModal);
  };

  render() {
    const { isOpen, closeModal, selectedEmployee } = this.props;

    if (!selectedEmployee) return null;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel={'Remove Employee'}
        content={
          <RemoveContent
            selectedEmployee={selectedEmployee}
            closeModal={closeModal}
            handleConfirmClick={this.handleConfirmClick}
          />
        }
      />
    );
  }
}

RemoveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleRemoveSuccess: PropTypes.func.isRequired,
  selectedEmployee: PropTypes.object
};

export default RemoveModal;
