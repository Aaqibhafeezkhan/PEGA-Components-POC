import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsActionableButtonProps = Record<string, any>;

export const PegaExtensionsActionableButton = (props: PegaExtensionsActionableButtonProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_ActionableButton"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsActionableButton);
