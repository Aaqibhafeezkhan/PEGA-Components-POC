import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsMapProps = Record<string, any>;

export const PegaExtensionsMap = (props: PegaExtensionsMapProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_Map"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsMap);
