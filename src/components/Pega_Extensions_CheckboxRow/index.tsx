import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCheckboxRowProps = Record<string, any>;

export const PegaExtensionsCheckboxRow = (props: PegaExtensionsCheckboxRowProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_CheckboxRow"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsCheckboxRow);
