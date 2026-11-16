import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardContent,
  Flex,
  Button,
  Input,
  Status,
  Text,
  FieldValueList,
} from '@pega/cosmos-react-core';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
`;

// Top Navigation Bar simulating Pega Dev Studio header with Dropdowns
const PegaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 2px solid #e5e7eb;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const HeaderButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.45rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }

  &:focus {
    outline: 2px solid #2563eb;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 200px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
  padding: 0.35rem 0;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #eff6ff;
    color: #1d4ed8;
  }
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

const StyledNativeSelect = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 0.875rem;
  color: #111827;

  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: 1px;
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
  argTypes: {
    selectedConditionKey: {
      name: 'Decision Table Context Key',
      control: 'select',
      description: 'Storybook Control dropdown for configuration changes',
      options: [
        'pyRepliesToMyComments',
        'pyDirectMessages',
        'pyFollowingCases',
        'pyMentions',
        'Posts',
        'pyAllDirectMessages',
        '*',
      ],
    },
    customParameter: {
      name: 'Dynamic Fallback Parameter',
      control: 'text',
      description: 'Used when key is * (otherwise branch)',
    },
    actionSimulation: {
      name: 'Triggered Pega Action',
      control: 'select',
      options: ['executeDecision', 'evaluateDataPage', 'reloadView', 'updateLocalizationToken'],
    },
  },
} satisfies Meta;

interface DecisionRow {
  condition: string;
  labelKey: string;
  actionReturn: string;
  statusVariant: 'info' | 'success' | 'warn' | 'urgent';
  description: string;
}

const DECISION_TABLE_RULES: DecisionRow[] = [
  {
    condition: 'if',
    labelKey: 'pyRepliesToMyComments',
    actionReturn: 'Replies to my comments',
    statusVariant: 'info',
    description: 'Direct thread replies and follow-ups to posts initiated by the current operator.',
  },
  {
    condition: 'else if',
    labelKey: 'pyDirectMessages',
    actionReturn: 'Private posts',
    statusVariant: 'warn',
    description: 'Confidential 1-to-1 pulses and direct private messages.',
  },
  {
    condition: 'else if',
    labelKey: 'pyFollowingCases',
    actionReturn: 'Comments on followed cases',
    statusVariant: 'info',
    description: 'Activity updates on cases bookmarked or followed by the user.',
  },
  {
    condition: 'else if',
    labelKey: 'pyMentions',
    actionReturn: 'Comments mentioning me',
    statusVariant: 'urgent',
    description: 'High-priority pulse messages tagging @User handle.',
  },
  {
    condition: 'else if',
    labelKey: 'Posts',
    actionReturn: 'All feed posts',
    statusVariant: 'success',
    description: 'Standard public pulses across the application space.',
  },
  {
    condition: 'else if',
    labelKey: 'pyAllDirectMessages',
    actionReturn: 'All private messages',
    statusVariant: 'warn',
    description: 'Aggregated mailbox of direct communications.',
  },
  {
    condition: 'otherwise',
    labelKey: '*',
    actionReturn: '@getLocalizedValue(Label)',
    statusVariant: 'info',
    description: 'Fallback rule invoking Pega localization engine.',
  },
];

type Story = StoryObj<{
  selectedConditionKey?: string;
  customParameter?: string;
  actionSimulation?: string;
}>;

export const InteractiveDecisionTable: Story = {
  args: {
    selectedConditionKey: 'pyMentions',
    customParameter: '',
    actionSimulation: 'executeDecision',
  },
  render: (args) => {
    // Both Storybook Controls panel dropdown AND the in-canvas dropdown stay synchronized
    const [selectedKey, setSelectedKey] = useState<string>(args.selectedConditionKey || 'pyMentions');
    const [customParam, setCustomParam] = useState<string>(args.customParameter || '');

    // State for top navigation dropdown menus (Save as ⌵, Rule actions ⌵)
    const [openDropdown, setOpenDropdown] = useState<'saveAs' | 'ruleActions' | null>(null);
    const [lastActionNotification, setLastActionNotification] = useState<string>('');

    // Sync when args change from Storybook Controls panel
    React.useEffect(() => {
      if (args.selectedConditionKey) setSelectedKey(args.selectedConditionKey);
    }, [args.selectedConditionKey]);

    React.useEffect(() => {
      if (args.customParameter !== undefined) setCustomParam(args.customParameter);
    }, [args.customParameter]);

    const activeRule =
      DECISION_TABLE_RULES.find((r) => r.labelKey === selectedKey) ||
      DECISION_TABLE_RULES[DECISION_TABLE_RULES.length - 1];

    const resolvedLabel =
      selectedKey === '*'
        ? customParam.trim()
          ? `Localized: [${customParam}]`
          : '@getLocalizedValue(Label)'
        : activeRule.actionReturn;

    const toggleDropdown = (name: 'saveAs' | 'ruleActions') => {
      setOpenDropdown((prev) => (prev === name ? null : name));
    };

    const handleMenuClick = (actionName: string) => {
      setOpenDropdown(null);
      setLastActionNotification(`Executed: ${actionName}`);
      setTimeout(() => setLastActionNotification(''), 4000);
    };

    return (
      <Container>
        {/* Pega Dev Studio Top Header with Dropdown menus (as per Screenshot 1 & 2) */}
        <PegaHeader>
          <HeaderTitleGroup>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>
                DECISION TABLE
              </span>
              <Status variant='success'>Status: Yes</Status>
            </div>
            <Text variant='h2' style={{ margin: 0 }}>
              PulseLocalization
            </Text>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              APPLIES TO <strong>Embed-Feed-DataSource</strong> • ID <strong>pyPulseLocalization</strong> • RULESET{' '}
              <strong>Pega-Social:08-26-01</strong>
            </span>
          </HeaderTitleGroup>

          <HeaderButtonGroup>
            {/* Save as ⌵ Dropdown Menu */}
            <DropdownWrapper>
              <DropdownTrigger onClick={() => toggleDropdown('saveAs')}>
                Save as ▾
              </DropdownTrigger>
              {openDropdown === 'saveAs' && (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleMenuClick('Save As New Version')}>
                    Save As (New Version)
                  </DropdownItem>
                  <DropdownItem onClick={() => handleMenuClick('Save As Specialization')}>
                    Specialize by RuleSet
                  </DropdownItem>
                  <DropdownItem onClick={() => handleMenuClick('Save As Circumstance')}>
                    Circumstance Rule
                  </DropdownItem>
                </DropdownMenu>
              )}
            </DropdownWrapper>

            {/* Rule actions ⌵ Dropdown Menu */}
            <DropdownWrapper>
              <DropdownTrigger onClick={() => toggleDropdown('ruleActions')}>
                Rule actions ▾
              </DropdownTrigger>
              {openDropdown === 'ruleActions' && (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleMenuClick('Run Decision Table Test')}>
                    ▶ Run Rule Test
                  </DropdownItem>
                  <DropdownItem onClick={() => handleMenuClick('View History / Audits')}>
                    History & Revisions
                  </DropdownItem>
                  <DropdownItem onClick={() => handleMenuClick('Export Decision Table CSV')}>
                    Export to CSV / Excel
                  </DropdownItem>
                  <DropdownItem onClick={() => handleMenuClick('Show Conflicts')}>
                    Check Conflicts
                  </DropdownItem>
                </DropdownMenu>
              )}
            </DropdownWrapper>

            <Button variant='primary' onClick={() => handleMenuClick('Private Edit Checked Out')}>
              Private edit
            </Button>
          </HeaderButtonGroup>
        </PegaHeader>

        {lastActionNotification && (
          <div
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '4px',
              fontSize: '0.875rem',
              color: '#065f46',
            }}
          >
            ✓ {lastActionNotification}
          </div>
        )}

        <Card>
          <CardHeader
            actions={
              <Status variant={activeRule.statusVariant}>Rule Active: {activeRule.condition}</Status>
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
                    <th>Conditions: Label</th>
                    <th>Actions: Return</th>
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
                          <strong>&quot;{rule.labelKey}&quot;</strong>
                        </td>
                        <td>
                          <code>&quot;{rule.actionReturn}&quot;</code>
                        </td>
                        <td>
                          <Status variant={rule.statusVariant}>{rule.statusVariant}</Status>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </DecisionTable>
            </TableWrapper>
          </CardContent>
        </Card>

        {/* Configuration Changes Dropdown & Simulator */}
        <Card>
          <CardHeader>Configuration Changes & Dynamic Evaluation</CardHeader>
          <CardContent>
            <Flex container={{ direction: 'column', gap: 1 }}>
              <Flex container={{ direction: 'row', gap: 2, alignItems: 'center' }}>
                <div style={{ minWidth: 320 }}>
                  <label
                    htmlFor='decision-table-select'
                    style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}
                  >
                    Context Dropdown (Choose Decision Condition)
                  </label>
                  <StyledNativeSelect
                    id='decision-table-select'
                    value={selectedKey}
                    onChange={(e: any) => setSelectedKey(e.target.value)}
                  >
                    {DECISION_TABLE_RULES.map((r) => (
                      <option key={r.labelKey} value={r.labelKey}>
                        {r.labelKey} ({r.condition})
                      </option>
                    ))}
                  </StyledNativeSelect>
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
                      value: `invokeRestApi('${args.actionSimulation || 'executeDecision'}', { table: 'pyPulseLocalization', key: '${selectedKey}' })`,
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
