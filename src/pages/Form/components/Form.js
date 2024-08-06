import { Trans } from '@lingui/macro';
import { LightCard } from 'components/Card';
import { RowCenter, RowFlex } from 'components/Row';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemedText } from 'theme';
import PhonePrefixesData from "assets/data/phonePrefixes.json"

const FormContainer = styled.form`
  max-width: 1200px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const TextInput = styled.input`
  width: 97%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 95%;
  `};
`;


const SelectInput = styled.select`
  width: 30%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  background: ${({ $reset }) => $reset ? '#9b111e' : '#0061a9'};
  color: #fff;
  width: fit-content;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ $reset }) => $reset ? '#ba3b35' : '#2271b3'};
  border-radius: 16px;
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    background:  ${({ $reset }) => $reset ? '#a2231d' : '#0096d2'};
    border-color: ${({ $reset }) => $reset ? '#a2231d' : '#0096d2'};
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    outline: none;
  }

  &:active {
    background: ${({ $reset }) => $reset ? '#a2231d' : '#007ab8'};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    transform: translateY(2px);
  }
  &:disabled {
    background: #b0b0b0;
    color: #6c6c6c;
    border: 1px solid #a0a0a0;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }
`;

export function Form() {
    const [formValues, setFormValues] = useState({
        name: '',
        birth: '',
        city: '',
        email: '',
        phone: '',
        phonePrefix: '+44'
    });

    const [phonePrefixes, setPhonePrefixes] = useState([]);

    useEffect(() => {
        setPhonePrefixes(PhonePrefixesData);
    }, []);

    const handleReset = () => {
        setFormValues({
            name: '',
            birth: '',
            city: '',
            email: '',
            phone: ''
        });
    };

    const isFormComplete = () => {
        return Object.values(formValues).every(value => value.trim() !== '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setFormValues({ ...formValues, phonePrefix: value });
    };

    return (
        <LightCard width="100%" margin="auto" mt="2rem" style={{ maxWidth: '600px' }}>
            <FormContainer onSubmit={handleSubmit}>
                <FormGroup>
                    <ThemedText.Body htmlFor="name">
                        <Trans>Name</Trans>*:
                    </ThemedText.Body>
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        placeholder="Juan"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <ThemedText.Body htmlFor="birth">
                        <Trans>Date of birth</Trans>*:
                    </ThemedText.Body>
                    <TextInput
                        type="date"
                        id="birth"
                        name="birth"
                        value={formValues.birth}
                        onChange={handleInputChange}
                        placeholder="20/10/12"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <ThemedText.Body htmlFor="birth">
                        <Trans>City</Trans>*:
                    </ThemedText.Body>
                    <TextInput
                        type="text"
                        id="city"
                        name="city"
                        value={formValues.city}
                        onChange={handleInputChange}
                        placeholder="Juan"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <ThemedText.Body htmlFor="email">
                        <Trans>E-mail</Trans>*:
                    </ThemedText.Body>
                    <TextInput
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder="test@gmail.com"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <ThemedText.Body htmlFor="phone">
                        <Trans>Phone</Trans>*:
                    </ThemedText.Body>
                    <RowFlex>
                        <SelectInput
                            id="phonePrefix"
                            name="phonePrefix"
                            value={formValues.phonePrefix}
                            onChange={handleSelectChange}
                        >
                            {phonePrefixes.map(prefix => (
                                <option key={prefix.value} value={prefix.value}>
                                    {prefix.label}
                                </option>
                            ))}
                        </SelectInput>
                        <TextInput
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formValues.phone}
                            onChange={handleInputChange}
                            placeholder="123456789"
                            style={{ marginLeft: '0.5rem', flex: 1 }}
                            required
                        />
                    </RowFlex>
                </FormGroup>
                <RowCenter style={{ gap: '2rem' }}>
                    <Button $reset type="button" onClick={handleReset}>
                        <Trans>Reset</Trans>
                    </Button>
                    <Button type="submit" disabled={!isFormComplete()}>
                        <Trans>Submit</Trans>
                    </Button>
                </RowCenter>
            </FormContainer>
        </LightCard>
    );
};