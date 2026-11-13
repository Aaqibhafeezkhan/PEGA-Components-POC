import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsRatingLayoutProps = Record<string, any>;

export const PegaExtensionsRatingLayout = (props: PegaExtensionsRatingLayoutProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_RatingLayout"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsRatingLayout);
