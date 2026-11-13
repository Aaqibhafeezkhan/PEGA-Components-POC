import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsImageMagnifyProps = Record<string, any>;

export const PegaExtensionsImageMagnify = (props: PegaExtensionsImageMagnifyProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_ImageMagnify"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsImageMagnify);
