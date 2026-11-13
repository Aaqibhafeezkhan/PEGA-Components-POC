import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsBannerInputProps = Record<string, any>;

export const PegaExtensionsBannerInput = (props: PegaExtensionsBannerInputProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_BannerInput"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsBannerInput);
