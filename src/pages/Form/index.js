import React from "react";
import styled from "styled-components";
import { AutoColumn } from "components/Column";
import { ThemedText } from "theme";
import { Trans } from "@lingui/macro";
import { Form } from "./components/Form";

const PageWrapper = styled(AutoColumn)`
  width: 100%;
  margin-top: 4rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
      max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
      max-width: 500px;
  `};
`;

export default function ContactForm() {

    return (
        <PageWrapper>
            <ThemedText.Title textAlign="center">
                <Trans>Contact Form</Trans>
            </ThemedText.Title>
            <Form />
        </PageWrapper>
    );
}
