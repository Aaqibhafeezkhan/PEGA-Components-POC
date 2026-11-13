import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsEventListenerProps = Record<string, any>;

export const PegaExtensionsEventListener = (props: PegaExtensionsEventListenerProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_EventListener"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsEventListener);
