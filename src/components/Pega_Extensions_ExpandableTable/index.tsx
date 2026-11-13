import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsExpandableTableProps = Record<string, any>;

export const PegaExtensionsExpandableTable = (props: PegaExtensionsExpandableTableProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_ExpandableTable"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsExpandableTable);
