import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsMeterProps = Record<string, any>;

export const PegaExtensionsMeter = (props: PegaExtensionsMeterProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_Meter"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsMeter);
