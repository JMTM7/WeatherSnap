import React from "react";
import styled from "styled-components";
import { AutoColumn } from "components/Column";
import { ThemedText } from "theme";
import { Trans } from "@lingui/macro";

const PageWrapper = styled(AutoColumn)`
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  margin: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
      max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
      max-width: 500px;
  `};
`;

export default function Form() {

    return (
        <PageWrapper>
            <ThemedText.LargeHeader>
                <Trans>Contact Form</Trans>
            </ThemedText.LargeHeader>
        </PageWrapper>
    );
}
