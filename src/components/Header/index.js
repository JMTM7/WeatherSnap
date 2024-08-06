import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useActiveLocale } from 'hooks/useActiveLocale';
import { LOCALE_LABEL, SUPPORTED_LOCALES } from 'constants/locales';
import { useUserLocaleManager } from 'state/user/hooks';
import Logo from 'assets/images/logo.png';
import { ThemedText } from 'theme';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { RowLeft } from 'components/Row';
import { useLocationLinkProps } from 'hooks/useLocationLinkProps';

const HeaderFrame = styled.div`
  height: 40px;
  background: ${({ theme }) => theme.bg2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  padding: 1rem;
  z-index: 21;
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const GlobeIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

const InternalMenuItem = styled(Link)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text1};
  &:hover {
    background: ${({ theme }) => theme.bg5};
    cursor: pointer;
    border-radius: 12px;
  }
`;

const InternalLinkMenuItem = styled(InternalMenuItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
`;

const MenuFlyout = styled.span`
  min-width: 100px;
  max-height: 350px;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);
  border: 1px solid ${({ theme }) => theme.bg4};
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: absolute;
  z-index: 99;
  gap: 0.5rem;
  top: 70%;
  right: 0;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
`;

function LanguageMenuItem({ locale, active }) {
  const { to } = useLocationLinkProps(locale);

  if (active) return null;

  if (!to) return null;

  const countryCode = locale.split('-')[1];
  return (
    <InternalLinkMenuItem to={to}>
      <img src={`${process.env.PUBLIC_URL}/images/flags/${countryCode}.svg`} width="16px" alt="flags" />
      <ThemedText.Body>
        {LOCALE_LABEL[locale]}
      </ThemedText.Body>
    </InternalLinkMenuItem>
  );
}

export default function Header() {
  const activeLocale = useActiveLocale();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [, setUserLocale] = useUserLocaleManager();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleLocaleChange = useCallback((locale) => {
    setUserLocale(locale);
    setMenuOpen(false);
  }, [setUserLocale]);

  const countryCode = activeLocale.split('-')[1];

  return (
    <>
      <HeaderFrame>
        <RowLeft style={{ gap: '2rem' }}>
          <HeaderElement onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} fontSize={30} color="#3ea3e4" />
          </HeaderElement>
          <a href="/">
            <img src={Logo} alt="logo" width="200px" />
          </a>
        </RowLeft>
        <HeaderControls>
          <HeaderElement onClick={toggleMenu}>
            <GlobeIcon>
              <img
                src={`${process.env.PUBLIC_URL}/images/flags/${countryCode}.svg`}
                alt="flags"
              />
            </GlobeIcon>
          </HeaderElement>
          {isMenuOpen && (
            <MenuFlyout onClick={toggleMenu}>
              {SUPPORTED_LOCALES.map((locale) => (
                <LanguageMenuItem
                  locale={locale}
                  active={activeLocale === locale}
                  key={locale}
                  onClick={() => handleLocaleChange(locale)}
                />
              ))}
            </MenuFlyout>
          )}
        </HeaderControls>
      </HeaderFrame>
      <Overlay $isVisible={isSidebarOpen} onClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
}
