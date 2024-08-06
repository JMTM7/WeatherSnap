import React, { useMemo } from "react";
import { Text } from "rebass";
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";
import { isMobile } from "utils/userAgent";

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  accumulator[size] = (a, b, c) => css`
    @media (max-width: ${MEDIA_WIDTHS[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {});

function colors() {
  return {

    // backgrounds
    bg0: "linear-gradient(204deg, rgba(39,88,122,1) 0%, rgba(10,59,93,1) 100%)",
    bg1: "#1B1D20",
    bg2: "#102C54",
    bg3: "#094293",
    bg4: "#0f5787",
    bg5: "#226A9A",

    // backgrounds cards
    bgCard0: "#1B1D20",
    bgCard1: "#003153",

    // Primary
    primary1: "#51D1F6",

    // text
    text1: "#FFF",
    text2: "#000",

    // Link
    link1: "#3498DB",

    // Border
    border1: "#121d2E",
  };
}

function theme() {
  return {
    ...colors(),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    // shadows
    shadow1: "#2F80ED",

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({ children }) {
  const themeObject = useMemo(() => theme(), []);

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
`;

export const ThemedText = {
  Title(props) {
    return <TextWrapper fontSize={isMobile ? 24 : 48} fontWeight={900} color={"primary1"} {...props} />;
  },
  ExtraLargeHeader(props) {
    return <TextWrapper fontSize={36} fontWeight={900} color={"text1"} {...props} />;
  },
  LargeHeader(props) {
    return <TextWrapper fontSize={24} fontWeight={900} color={"text1"} {...props} />;
  },
  MediumHeader(props) {
    return <TextWrapper fontSize={20} fontWeight={900} color={"text1"} {...props} />;
  },
  Body(props) {
    return (
      <TextWrapper fontWeight={400} fontSize={16} color={"text1"} {...props} />
    );
  },
};

export const ThemedGlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html {
    background: ${({ theme }) => theme.bg0};
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;
