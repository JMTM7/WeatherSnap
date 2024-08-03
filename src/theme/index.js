import React, { useMemo } from "react";
import { Text } from "rebass";
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";

import { useIsDarkMode } from "../state/user/hooks";

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

function colors(darkMode) {
  return {
    darkMode,

    // backgrounds
    bg0: darkMode ? "#1b1d20" : "#1b1d20",

    // text
    text1: darkMode ? "#000000" : "#000000",
    text2: darkMode ? "#FFFFFF" : "#FFFFFF",



  };
}

function theme(darkMode) {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? "#000" : "#2F80ED",

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

export default function ThemeProvider({
  children,
}) {

  const darkMode = useIsDarkMode();

  const themeObject = useMemo(() => theme(darkMode), [darkMode]);

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => (ThemedGlobalStyle)[color]};
`;

/**
 * Preset styles of the Rebass Text component
 */

export const ThemedText = {
  Main(props) {
    return <TextWrapper fontWeight={500} color={"text2"} {...props} />;
  },
  Link(props) {
    return <TextWrapper fontWeight={500} color={"primary1"} {...props} />;
  },
  Label(props) {
    return <TextWrapper fontWeight={600} color={"text1"} {...props} />;
  },
  Black(props) {
    return <TextWrapper fontWeight={500} color={"text1"} {...props} />;
  },
  White(props) {
    return <TextWrapper fontWeight={500} color={"white"} {...props} />;
  },
  Body(props) {
    return (
      <TextWrapper fontWeight={400} fontSize={16} color={"text1"} {...props} />
    );
  },
};

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    background: ${({ theme }) => theme.bg0};
    height: 100vh;
  }
`;
