import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsBannerProps = Record<string, any>;

export const PegaExtensionsBanner = (props: PegaExtensionsBannerProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_Banner"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsBanner);
