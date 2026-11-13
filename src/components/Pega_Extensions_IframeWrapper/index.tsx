import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsIframeWrapperProps = Record<string, any>;

export const PegaExtensionsIframeWrapper = (props: PegaExtensionsIframeWrapperProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_IframeWrapper"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsIframeWrapper);
