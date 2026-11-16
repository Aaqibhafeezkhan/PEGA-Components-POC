import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardContent,
  Flex,
  Select,
  Input,
  Badge,
  Text,
  FieldValueList,
} from '@pega/cosmos-react-core';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #ffffff;
`;

const DecisionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  th,
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
  }

  th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #374151;
  }

  tr.active-row {
    background-color: #e0f2fe;
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const PreviewBox = styled.div`
  padding: 1rem;
  border-radius: 6px;
  background-color: #f3f4f6;
  border-left: 4px solid #2563eb;
`;

export default {
  title: 'Experimental/Decision Table Config',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

// Simulated Pega Decision Table records based on pyPulseLocalization / Embed-Feed-DataSource
interface DecisionRow {
  condition: string;
  labelKey: string;
  actionReturn: string;
  badgeVariant: 'info' | 'success' | 'warn' | 'urgent';
  description: string;
}

const DECISION_TABLE_RULES: DecisionRow[] = [
  {
    condition: 'if',
    labelKey: 'pyRepliesToMyComments',
    actionReturn: 'Replies to my comments',
    badgeVariant: 'info',
    description: 'Direct thread replies and follow-ups to posts initiated by the current operator.',
  },
  {
    condition: 'else if',
    labelKey: 'pyDirectMessages',
    actionReturn: 'Private posts',
    badgeVariant: 'warn',
    description: 'Confidential 1-to-1 pulses and direct private messages.',
  },
  {
    condition: 'else if',
    labelKey: 'pyFollowingCases',
    actionReturn: 'Comments on followed cases',
    badgeVariant: 'info',
    description: 'Activity updates on cases bookmarked or followed by the user.',
  },
  {
    condition: 'else if',
    labelKey: 'pyMentions',
    actionReturn: 'Comments mentioning me',
    badgeVariant: 'urgent',
    description: 'High-priority pulse messages tagging @User handle.',
  },
  {
    condition: 'else if',
    labelKey: 'Posts',
    actionReturn: 'All feed posts',
    badgeVariant: 'success',
    description: 'Standard public pulses across the application space.',
  },
  {
    condition: 'else if',
    labelKey: 'pyAllDirectMessages',
    actionReturn: 'All private messages',
    badgeVariant: 'warn',
    description: 'Aggregated mailbox of direct communications.',
  },
  {
    condition: 'otherwise',
    labelKey: '*',
    actionReturn: '@getLocalizedValue(Label)',
    badgeVariant: 'info',
    description: 'Fallback rule invoking Pega localization engine.',
  },
];

export const InteractiveDecisionTable: StoryObj = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string>('pyMentions');
    const [customParam, setCustomParam] = useState<string>('');

    const activeRule =
      DECISION_TABLE_RULES.find((r) => r.labelKey === selectedKey) ||
      DECISION_TABLE_RULES[DECISION_TABLE_RULES.length - 1];

    const resolvedLabel =
      selectedKey === '*'
        ? customParam.trim()
          ? `Localized: [${customParam}]`
          : '@getLocalizedValue(Label)'
        : activeRule.actionReturn;

    return (
      <Container>
        <div>
          <h2>Decision Table Component Configuration</h2>
          <Text variant='secondary'>
            Inspired by <strong>Embed-Feed-DataSource • pyPulseLocalization</strong>. Rather than
            hardcoding field labels, formats, or component actions in static configuration files,
            this pattern uses a Pega Decision Table to dynamically determine runtime component
            behavior based on contextual conditions.
          </Text>
        </div>

        <Card>
          <CardHeader
            actions={
              <Badge variant={activeRule.badgeVariant}>Rule Active: {activeRule.condition}</Badge>
            }
          >
            Decision Table: pyPulseLocalization
          </CardHeader>
          <CardContent>
            <TableWrapper>
              <DecisionTable>
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Condition (Label Key)</th>
                    <th>Action (Return Label / Config)</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {DECISION_TABLE_RULES.map((rule) => {
                    const isSelected = rule.labelKey === selectedKey;
                    return (
                      <tr
                        key={rule.labelKey}
                        className={isSelected ? 'active-row' : ''}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedKey(rule.labelKey)}
                      >
                        <td>
                          <code>{rule.condition}</code>
                        </td>
                        <td>
                          <strong>{rule.labelKey}</strong>
                        </td>
                        <td>
                          <code>{rule.actionReturn}</code>
                        </td>
                        <td>
                          <Badge variant={rule.badgeVariant}>{rule.badgeVariant}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </DecisionTable>
            </TableWrapper>
          </CardContent>
        </Card>

        {/* Interactive Simulator */}
        <Card>
          <CardHeader>Runtime Constellation Component Simulator</CardHeader>
          <CardContent>
            <Flex container={{ direction: 'column', gap: 1 }}>
              <Flex container={{ direction: 'row', gap: 2, alignItems: 'center' }}>
                <div style={{ minWidth: 260 }}>
                  <Select
                    label='Select Incoming Context (Condition Key)'
                    value={selectedKey}
                    onChange={(e: any) => setSelectedKey(e.target.value)}
                  >
                    {DECISION_TABLE_RULES.map((r) => (
                      <option key={r.labelKey} value={r.labelKey}>
                        {r.labelKey} ({r.condition})
                      </option>
                    ))}
                  </Select>
                </div>
                {selectedKey === '*' && (
                  <div style={{ flex: 1 }}>
                    <Input
                      label='Custom Dynamic Key Parameter'
                      placeholder='Enter dynamic label token...'
                      value={customParam}
                      onChange={(e: any) => setCustomParam(e.target.value)}
                    />
                  </div>
                )}
              </Flex>

              <PreviewBox>
                <Text variant='h3' style={{ margin: '0 0 0.5rem 0' }}>
                  Component Render Output
                </Text>
                <FieldValueList
                  fields={[
                    { name: 'Resolved Component Label', value: resolvedLabel },
                    { name: 'Source Decision Rule', value: `pyPulseLocalization (${activeRule.condition})` },
                    { name: 'Evaluation Logic', value: activeRule.description },
                    {
                      name: 'Pega DX Component Action',
                      value: `invokeRestApi('executeDecision', { table: 'pyPulseLocalization', key: '${selectedKey}' })`,
                    },
                  ]}
                />
              </PreviewBox>
            </Flex>
          </CardContent>
        </Card>
      </Container>
    );
  },
};
