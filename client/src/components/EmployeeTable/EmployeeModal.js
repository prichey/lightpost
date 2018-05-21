import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import EmployeeForm from './EmployeeForm';

// some voodoo to make styled-components work with react-modal
// via https://github.com/reactjs/react-modal/issues/603#issuecomment-378847885
const ModalAdapter = ({ className, ...props }) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;

  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
};

const StyledModal = styled(ModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.75);
  }

  &__content {
    position: absolute;
    top: 4rem;
    left: 4rem;
    right: 4rem;
    max-width: 50rem;
    max-height: 100%;
    margin: 0 auto;
    border: 1px solid #ccc;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 5px;
    outline: none;
    padding: 2rem;

    ${breakpoint('tablet')`
      padding: 3rem;
  `};
  }
`;

class EmployeeModal extends React.Component {
  render() {
    const {
      isOpen,
      closeModal,
      actionIsAdd,
      selectedEmployee,
      handleAddSuccess
    } = this.props;

    return (
      <StyledModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel={actionIsAdd ? 'Add New Employee' : 'Edit Employee'}
      >
        <EmployeeForm
          closeModal={closeModal}
          actionIsAdd={actionIsAdd}
          selectedEmployee={selectedEmployee}
          handleAddSuccess={handleAddSuccess}
        />
      </StyledModal>
    );
  }
}

EmployeeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  actionIsAdd: PropTypes.bool.isRequired,
  handleAddSuccess: PropTypes.func.isRequired
};

export default EmployeeModal;
