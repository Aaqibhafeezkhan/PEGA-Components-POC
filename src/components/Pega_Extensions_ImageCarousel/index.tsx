import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsImageCarouselProps = Record<string, any>;

export const PegaExtensionsImageCarousel = (props: PegaExtensionsImageCarouselProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_ImageCarousel"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsImageCarousel);
