import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: lightgrey;
  padding: 20px;
  border-radius: 10px;
  border: 5px solid black;
  height: 500px;
  width: 500px;
`;

const StyledInput = styled.input`
  background-color: lightgrey;
  border: 1px solid black;
  width: 200px;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 25px;
  > p {
    margin: 0;
  }
  padding: 10px;
`;

const Dropdown = styled.div`
  width: calc(200px + 6px);
  > a {
    position: relative;
    display: inline-block;
    &:hover {
      > div {
        display: block;
      }
    }
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  z-index: 1;
`;

const DropdownOption = styled.div`
  background-color: ${props => props.selected ? "grey" : "#f9f9f9"};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
`;

export const EditOppModal = ({opportunity}) => {
  const [newOpp, setNewOpp] = useState(opportunity);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = () => {
    console.log(newOpp);
    try {
      fetch(`http://localhost:3000/api/opportunities/${newOpp.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOpp)
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e) => {
    console.log(e)
    setNewOpp({
      ...newOpp,
      [e.target.name]: e.target.value
    });
  }

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  }

  const handleStatusClick = (e) => {
    setNewOpp({
      ...newOpp,
      status: e.target.innerText
    });
    setShowDropdown(false);
  }

  return (
    <Overlay>
      <Modal>
      <h1>Edit Opportunity</h1>
      <GroupContainer>
        <p>Title</p>
        <StyledInput name="title" onChange={handleChange} value={newOpp.title}></StyledInput>
      </GroupContainer>

      <GroupContainer>
        <p>Description</p>
        <StyledInput name="description" onChange={handleChange} value={newOpp.description}></StyledInput>
      </GroupContainer>

      <GroupContainer>
        <p>Status</p>
        <Dropdown>
          <button onClick={() => handleDropdownClick()}>{newOpp.status}</button>
          { 
          showDropdown &&
            <DropdownContainer>
            <DropdownOption selected={newOpp.status === "Open"} onClick={handleStatusClick}>Open</DropdownOption>
            <DropdownOption selected={newOpp.status === "Handover"} onClick={handleStatusClick}>Handover</DropdownOption>
            <DropdownOption selected={newOpp.status === "Change"} onClick={handleStatusClick}>Change</DropdownOption>
          </DropdownContainer>
        }
        </Dropdown>
      </GroupContainer>

      <GroupContainer>
        <p>Customer Name</p>
        <StyledInput name="customerName" onChange={handleChange} value={newOpp.customerName}></StyledInput>
      </GroupContainer>

      <GroupContainer>
        <p>Type</p>
        <StyledInput name="type" onChange={handleChange} value={newOpp.opportunityType}></StyledInput>
      </GroupContainer>

      <GroupContainer>
        <p>Start Date</p>
        <StyledInput
          name="startDate"
          onChange={handleChange}
          value={newOpp.startDate}
          disabled={newOpp.opportunityType !== 'Help'}
          ></StyledInput>
      </GroupContainer>

      <GroupContainer>
        <p>End Date</p>
        <StyledInput
          name="endDate"
          onChange={handleChange}
          value={newOpp.endDate}
          disabled={newOpp.opportunityType !== 'Cover'}
        ></StyledInput>
      </GroupContainer>

      <button onClick={handleSubmit}>Save</button>
      </Modal>
    </Overlay>
  );
}