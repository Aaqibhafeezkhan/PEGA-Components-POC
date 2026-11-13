import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsStarRatingInputProps = Record<string, any>;

export const PegaExtensionsStarRatingInput = (props: PegaExtensionsStarRatingInputProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_StarRatingInput"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsStarRatingInput);
