import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsMaskedInputProps = Record<string, any>;

export const PegaExtensionsMaskedInput = (props: PegaExtensionsMaskedInputProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_MaskedInput"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsMaskedInput);
