import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsHierarchicalFormAsTasksProps = Record<string, any>;

export const PegaExtensionsHierarchicalFormAsTasks = (props: PegaExtensionsHierarchicalFormAsTasksProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_HierarchicalFormAsTasks"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsHierarchicalFormAsTasks);
