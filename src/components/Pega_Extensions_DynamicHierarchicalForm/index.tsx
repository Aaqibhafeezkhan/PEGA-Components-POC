import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsDynamicHierarchicalFormProps = Record<string, any>;

export const PegaExtensionsDynamicHierarchicalForm = (props: PegaExtensionsDynamicHierarchicalFormProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_DynamicHierarchicalForm"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsDynamicHierarchicalForm);
