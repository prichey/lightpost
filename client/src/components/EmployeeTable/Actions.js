import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const ActionsWrap = styled.div`
  margin-bottom: 1em;

  ${breakpoint('tablet')`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2.5em;
  `};

  > * {
    height: 100%;
  }
`;

const ActionsText = styled.span`
  font-size: 24px;
  display: block;
  margin-bottom: 0.25em;

  ${breakpoint('tablet')`
    flex-grow: 0;
    margin-bottom: 0;
  `};
`;

const ButtonList = styled.ul`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;

  ${breakpoint('tablet')`
    margin-left: 1em;
  `};
`;

const ButtonWrap = styled.li`
  height: 100%;
  width: auto;

  & + & {
    margin-left: 1em;
  }
`;

const Button = styled.button`
  padding: 1rem;
  background: #6a21fa;
  border: none;
  color: white;
  border-radius: 5px;
  font-size: 16px;
`;

class Actions extends React.Component {
  render() {
    const { openCreateModal, clearFilters } = this.props;
    return (
      <ActionsWrap>
        <ActionsText>{'Actions: '}</ActionsText>
        <ButtonList>
          <ButtonWrap>
            <Button onClick={openCreateModal}>Add Employee</Button>
          </ButtonWrap>
          <ButtonWrap>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </ButtonWrap>
        </ButtonList>
      </ActionsWrap>
    );
  }
}

Actions.propTypes = {
  openCreateModal: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export default Actions;