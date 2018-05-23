import React from 'react';
import PropTypes from 'prop-types';

import EmployeeForm from './EmployeeForm';
import Modal from '../common/Modal';

class EmployeeModal extends React.Component {
  render() {
    const {
      isOpen,
      closeModal,
      actionIsAdd,
      selectedEmployee,
      handleAddSuccess,
      handleUpdateSuccess
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel={actionIsAdd ? 'Add New Employee' : 'Edit Employee'}
        content={
          <EmployeeForm
            closeModal={closeModal}
            actionIsAdd={actionIsAdd}
            selectedEmployee={selectedEmployee}
            handleAddSuccess={handleAddSuccess}
            handleUpdateSuccess={handleUpdateSuccess}
          />
        }
      />
    );
  }
}

EmployeeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  actionIsAdd: PropTypes.bool.isRequired,
  handleAddSuccess: PropTypes.func.isRequired,
  handleUpdateSuccess: PropTypes.func.isRequired
};

export default EmployeeModal;
