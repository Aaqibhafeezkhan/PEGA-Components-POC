import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsTrendDisplayProps = Record<string, any>;

export const PegaExtensionsTrendDisplay = (props: PegaExtensionsTrendDisplayProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_TrendDisplay"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsTrendDisplay);
