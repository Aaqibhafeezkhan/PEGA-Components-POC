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
  Badge,
  Text,
  FieldValueList,
  Grid,
} from '@pega/cosmos-react-core';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const ModeTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? '#1f2937' : '#f3f4f6')};
  color: ${(props) => (props.$active ? '#ffffff' : '#4b5563')};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.$active ? '#111827' : '#e5e7eb')};
  }
`;

const ViewCard = styled.div`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 1rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export default {
  title: 'Experimental/View Mode Grouping',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

type ViewCategory = 'Full' | 'List' | 'Partial' | 'Form';

interface ViewConfigItem {
  id: string;
  name: string;
  category: ViewCategory;
  description: string;
  mappedComponent: string;
}

const VIEW_REGISTRY: ViewConfigItem[] = [
  // Full Views (Preview, Overview)
  {
    id: 'preview',
    name: 'Preview',
    category: 'Full',
    description: 'Comprehensive full-page summary view of the purchase order and customer context.',
    mappedComponent: 'Pega_Extensions_DynamicTemplate (Full Page Canvas)',
  },
  // List Views (Purchase Vehicle List)
  {
    id: 'purchase-vehicles',
    name: 'Purchase Vehicle List',
    category: 'List',
    description: 'Tabular list of selected vehicles, specs, quantities, and line item costs.',
    mappedComponent: 'Pega_Extensions_EditableTableLayout / ExpandableTable',
  },
  // Partial Views (Details, Compare Vehicles)
  {
    id: 'details',
    name: 'Details',
    category: 'Partial',
    description: 'Collapsible secondary information widget showing vehicle delivery and warranty specs.',
    mappedComponent: 'Pega_Extensions_CompareTableLayout',
  },
  {
    id: 'compare-vehicles',
    name: 'Compare Vehicles',
    category: 'Partial',
    description: 'Side-by-side spec comparison panel for shortlisted vehicles.',
    mappedComponent: 'Pega_Extensions_CardGallery / Comparison',
  },
  // Form Views (Collect Customer Details, Confirm Details, Create, Emails)
  {
    id: 'collect-customer',
    name: 'Collect Customer Details',
    category: 'Form',
    description: 'Step 1 Form capturing primary buyer profile, identity, and contact info.',
    mappedComponent: 'Pega_Extensions_FormWithVerticalStepper (Step 1)',
  },
  {
    id: 'confirm-details',
    name: 'Confirm Details',
    category: 'Form',
    description: 'Review and validation form with signature capture prior to final commit.',
    mappedComponent: 'Pega_Extensions_SignatureCapture / Toggle',
  },
  {
    id: 'create',
    name: 'Create',
    category: 'Form',
    description: 'Primary record instantiation form with required metadata inputs.',
    mappedComponent: 'Pega_Extensions_FormFullWidth',
  },
  {
    id: 'emails',
    name: 'Emails',
    category: 'Form',
    description: 'Form section configured for customer correspondence and notification triggers.',
    mappedComponent: 'Pega_Extensions_MarkdownInput / Email Form',
  },
];

export const ViewModeCatalog: StoryObj = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState<ViewCategory>('Full');

    const filteredViews = VIEW_REGISTRY.filter((v) => v.category === selectedCategory);

    return (
      <Container>
        <div>
          <h2>Pega Constellation View Mode Grouping</h2>
          <Text variant='secondary'>
            Modeled directly from Pega App Studio view authoring (Image 3). Components and templates
            are classified under expansive functional view modes: <strong>Full</strong>,{' '}
            <strong>List</strong>, <strong>Partial</strong>, and <strong>Form</strong>.
          </Text>
        </div>

        {/* Tab switchers */}
        <ModeTabs>
          {(['Full', 'List', 'Partial', 'Form'] as ViewCategory[]).map((cat) => (
            <TabButton
              key={cat}
              $active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} ({VIEW_REGISTRY.filter((v) => v.category === cat).length})
            </TabButton>
          ))}
        </ModeTabs>

        {/* Display filtered cards */}
        <Flex container={{ direction: 'column', gap: 1 }}>
          {filteredViews.map((item) => (
            <ViewCard key={item.id}>
              <Flex
                container={{
                  direction: 'row',
                  justify: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text variant='h3' style={{ margin: 0 }}>
                  📄 {item.name}
                </Text>
                <Badge variant='info'>{item.category} View</Badge>
              </Flex>
              <Text>{item.description}</Text>
              <FieldValueList
                fields={[
                  { name: 'View Identifier', value: item.id },
                  { name: 'Underlying DX Component', value: item.mappedComponent },
                  {
                    name: 'Authoring Scope',
                    value: `App Studio > Case Designer > Views > ${item.category}`,
                  },
                ]}
              />
            </ViewCard>
          ))}
        </Flex>
      </Container>
    );
  },
};

export const FullViewMode: StoryObj = {
  render: () => {
    return (
      <Container>
        <h3>Full View (e.g. Preview Canvas)</h3>
        <Card>
          <CardHeader>Preview - Full Page View</CardHeader>
          <CardContent>
            <FieldValueList
              fields={[
                { name: 'Vehicle Model', value: '2026 EV Sedan Executive' },
                { name: 'Status', value: 'Under Review' },
                { name: 'Total Estimated Amount', value: '$45,200.00' },
                { name: 'Preferred Delivery Hub', value: 'Metro Distribution Center' },
              ]}
            />
          </CardContent>
        </Card>
      </Container>
    );
  },
};

export const ListViewMode: StoryObj = {
  render: () => {
    return (
      <Container>
        <h3>List View (e.g. Purchase Vehicle List)</h3>
        <Card>
          <CardHeader>Purchase Vehicle List (2 items)</CardHeader>
          <CardContent>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '8px' }}>Vehicle ID</th>
                  <th style={{ padding: '8px' }}>Trim</th>
                  <th style={{ padding: '8px' }}>Color</th>
                  <th style={{ padding: '8px' }}>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px' }}>VH-9821</td>
                  <td style={{ padding: '8px' }}>AWD Long Range</td>
                  <td style={{ padding: '8px' }}>Midnight Silver</td>
                  <td style={{ padding: '8px' }}>$48,990</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px' }}>VH-9822</td>
                  <td style={{ padding: '8px' }}>RWD Standard</td>
                  <td style={{ padding: '8px' }}>Deep Blue Pearl</td>
                  <td style={{ padding: '8px' }}>$41,200</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Container>
    );
  },
};

export const PartialViewMode: StoryObj = {
  render: () => {
    return (
      <Container>
        <h3>Partial View (e.g. Details / Compare Vehicles)</h3>
        <Flex container={{ direction: 'row', gap: 1 }}>
          <Card style={{ flex: 1 }}>
            <CardHeader>Details</CardHeader>
            <CardContent>
              <Text>Warranty & Extended Battery Coverage: 8 Years / 100,000 Miles.</Text>
            </CardContent>
          </Card>
          <Card style={{ flex: 1 }}>
            <CardHeader>Compare Vehicles</CardHeader>
            <CardContent>
              <Text>Quick comparative spec sheet across selected fleet options.</Text>
            </CardContent>
          </Card>
        </Flex>
      </Container>
    );
  },
};

export const FormViewMode: StoryObj = {
  render: () => {
    return (
      <Container>
        <h3>Form View (e.g. Collect Customer Details)</h3>
        <Card>
          <CardHeader>Collect Customer Details</CardHeader>
          <CardContent>
            <Flex container={{ direction: 'column', gap: 1 }}>
              <Input label='Full Name' placeholder='Jane Doe' />
              <Input label='Corporate Email' placeholder='jane.doe@enterprise.com' />
              <Input label='Contact Phone' placeholder='+1 (555) 234-5678' />
              <div style={{ marginTop: '0.5rem' }}>
                <Button variant='primary'>Save and Continue</Button>
              </div>
            </Flex>
          </CardContent>
        </Card>
      </Container>
    );
  },
};
