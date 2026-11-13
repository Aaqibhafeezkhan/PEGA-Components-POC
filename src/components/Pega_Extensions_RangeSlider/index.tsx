import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsRangeSliderProps = Record<string, any>;

export const PegaExtensionsRangeSlider = (props: PegaExtensionsRangeSliderProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_RangeSlider"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsRangeSlider);
