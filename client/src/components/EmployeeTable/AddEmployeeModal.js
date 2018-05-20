import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';

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
    bottom: 4rem;
    max-width: 100rem;
    margin: 0 auto;
    border: 1px solid #ccc;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 5px;
    outline: none;
    padding: 2rem;
  }
`;

class AddEmployeeModal extends React.Component {
  render() {
    const { isOpen, closeModal } = this.props;

    return (
      <StyledModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Add Employee"
      >
        <h2>New Employee</h2>
      </StyledModal>
    );
  }
}

AddEmployeeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default AddEmployeeModal;
