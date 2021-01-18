import React, { Component } from 'react';
import styled from 'styled-components';
const mainColor = 'var(--bsm-color)';

export const PageTitle = styled.h3`
  color: ${props => props.color || mainColor};
  font-size: 1.4em;
  padding: 20px var(--bsm-padding) 25px var(--bsm-padding);
  margin: var(--bsm-padding) 0;
  //border-top: var(--bsm-border);
  border-bottom: var(--bsm-border);
  background: var(--bsm-background);
  min-width: 100%;
`;

export const RoundedButton = styled.button`
  text-align: center;
  background-color: var(--bsm-light);
  border: var(--bsm-border);
  color: var(--bsm-color);
  padding: 15px 30px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;
`;



