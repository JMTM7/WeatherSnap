import React, { useState } from 'react';
import styled from 'styled-components';
import { Trans } from '@lingui/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faCity, faFileContract, faHouse } from '@fortawesome/free-solid-svg-icons';
import { RowLeft } from 'components/Row';

const SidebarContainer = styled.div`
  position: fixed;
  top: 72px;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  width: 250px;
  height: 100vh;
  background: ${({ theme }) => theme.bg2};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: left 0.3s ease; 
  z-index: 25;
  gap: 1rem;
`;

const DropdownHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.text1};
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: ${({ theme }) => theme.link1};
  }
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CityItem = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 18px;
  cursor: pointer;
  gap: 0.5rem;
  padding-left: 2rem;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.link1};
  }
`;

const NavItem = styled.a`
  font-size: 24px;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  &:hover {
    color: ${({ theme }) => theme.link1};
  }
`;

const Sidebar = ({ isOpen }) => {
  const [isCitiesOpen, setCitiesOpen] = useState(false);

  const toggleCities = () => setCitiesOpen(!isCitiesOpen);

  return (
    <SidebarContainer $isOpen={isOpen}>
      <NavItem href="/">
        <RowLeft style={{ gap: '0.5rem' }}>
          <FontAwesomeIcon icon={faHouse} fontSize={18} />
          <Trans>Home</Trans>
        </RowLeft>
      </NavItem>
      <DropdownHeader onClick={toggleCities}>
        <FontAwesomeIcon icon={isCitiesOpen ? faChevronDown : faChevronRight} fontSize={16} />
        <Trans>Cities</Trans>
      </DropdownHeader>
      {isCitiesOpen &&
        <DropdownContent isOpen={isCitiesOpen}>
          <CityItem href="/weather/london">
            <FontAwesomeIcon icon={faCity} fontSize={18} />
            <Trans>London</Trans>
          </CityItem>
          <CityItem href="/weather/toronto">
            <FontAwesomeIcon icon={faCity} fontSize={18} />
            <Trans>Toronto</Trans>
          </CityItem>
          <CityItem href="/weather/singapore">
            <FontAwesomeIcon icon={faCity} fontSize={18} />
            <Trans>Singapore</Trans>
          </CityItem>
        </DropdownContent>}
      <NavItem href="/contact">
        <RowLeft style={{ gap: '0.5rem' }}>
          <FontAwesomeIcon icon={faFileContract} fontSize={18} />
          <Trans>Form</Trans>
        </RowLeft>
      </NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;
