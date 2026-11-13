import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsOAuthConnectProps = Record<string, any>;

export const PegaExtensionsOAuthConnect = (props: PegaExtensionsOAuthConnectProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_OAuthConnect"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsOAuthConnect);
