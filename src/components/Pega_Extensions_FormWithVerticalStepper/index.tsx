import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsFormWithVerticalStepperProps = Record<string, any>;

export const PegaExtensionsFormWithVerticalStepper = (props: PegaExtensionsFormWithVerticalStepperProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_FormWithVerticalStepper"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsFormWithVerticalStepper);
