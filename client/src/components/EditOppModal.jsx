import React, { useState } from 'react';
import { Calendar } from '../components/common/Calendar.jsx';
import styled from 'styled-components';
import { formatDate } from './utils/index.jsx';

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  width: calc(200px + 6px);
  z-index: 1;
`;

const DropdownOption = styled.div`
  background-color: ${props => props.selected ? "grey" : "#f9f9f9"};
  width: calc(100% - 32px);
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 5px 16px;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const typeOptions = ["Open", "Handover", "Cover"];
const statusOptions = ["Open", "In Progress", "Closed"];

export const EditOppModal = ({ opportunity, setSelectedOpp }) => {
  const [newOpp, setNewOpp] = useState(opportunity);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);

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
      setSelectedOpp(null);
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e) => {
    setNewOpp({
      ...newOpp,
      [e.target.name]: e.target.value
    });
  }

  const handleDropdownOptionClick = (type, e) => {
    setNewOpp({
      ...newOpp,
      [type]: e.target.innerText
    });
    setShowStatusDropdown(false);
    setShowTypeDropdown(false);
  };

  const handleCalendarChange = (type, e) => {
    setNewOpp({
      ...newOpp,
      [type]: formatDate(e)
    });
    setShowEndDateCalendar(false);
  }


  return (
    <Overlay>
      <Modal>
        <div>
          <h1 style={{ textAlign: "center" }}>Edit Opportunity</h1>
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
              <button style={{ width: 206 }} onClick={() => setShowStatusDropdown(true)}>{newOpp.status}</button>
              {
                showStatusDropdown &&
                <DropdownContainer>
                  {statusOptions.map(status => (
                    <DropdownOption
                      selected={newOpp.status === status}
                      onClick={(e) => handleDropdownOptionClick('status', e)}>
                      {status}
                    </DropdownOption>
                  ))}
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
            <Dropdown>
              <button style={{ width: 206 }} onClick={() => setShowTypeDropdown(true)}>{newOpp.opportunityType}</button>
              {
                showTypeDropdown &&
                <DropdownContainer>
                  {typeOptions.map(type => (
                    <DropdownOption
                      selected={newOpp.opportunityType === type}
                      onClick={(e) => handleDropdownOptionClick('opportunityType', e)}>
                      {type}
                    </DropdownOption>
                  ))}
                </DropdownContainer>
              }
            </Dropdown>
          </GroupContainer>
          {newOpp.opportunityType !== 'Open' && <GroupContainer>
            <p>Start Date</p>
            <StyledInput
              value={newOpp.startDate || ''}
              onClick={() => { setShowStartDateCalendar(true) }}
            ></StyledInput>
            {showStartDateCalendar && <Calendar onChange={(e) => handleCalendarChange('startDate', e)} />}
          </GroupContainer>
          }

          {newOpp.opportunityType === 'Cover' && <GroupContainer>
            <p>End Date</p>
            <StyledInput
              value={newOpp.endDate || ''}
              onClick={() => { setShowEndDateCalendar(true) }}
            ></StyledInput>
            {showEndDateCalendar && <Calendar onChange={(e) => handleCalendarChange('endDate', e)} />}
          </GroupContainer>
          }
        </div>
        <ButtonContainer>
          <button onClick={() => setSelectedOpp(null)}>Close</button>
          <button onClick={handleSubmit}>Save</button>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
}