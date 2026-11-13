import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsToggleProps = Record<string, any>;

export const PegaExtensionsToggle = (props: PegaExtensionsToggleProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_Toggle"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsToggle);
