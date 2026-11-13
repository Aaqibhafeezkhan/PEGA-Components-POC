import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCardGalleryProps = Record<string, any>;

export const PegaExtensionsCardGallery = (props: PegaExtensionsCardGalleryProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_CardGallery"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsCardGallery);
