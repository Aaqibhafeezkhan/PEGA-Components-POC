import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsNetworkDiagramProps = Record<string, any>;

export const PegaExtensionsNetworkDiagram = (props: PegaExtensionsNetworkDiagramProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_NetworkDiagram"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsNetworkDiagram);
