import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCPQTreeProps = Record<string, any>;

export const PegaExtensionsCPQTree = (props: PegaExtensionsCPQTreeProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_CPQTree"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsCPQTree);
