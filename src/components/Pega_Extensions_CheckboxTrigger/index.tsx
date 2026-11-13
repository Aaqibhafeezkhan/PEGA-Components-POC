import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCheckboxTriggerProps = Record<string, any>;

export const PegaExtensionsCheckboxTrigger = (props: PegaExtensionsCheckboxTriggerProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_CheckboxTrigger"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsCheckboxTrigger);
