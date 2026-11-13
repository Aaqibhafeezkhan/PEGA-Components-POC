import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsPasswordInputProps = Record<string, any>;

export const PegaExtensionsPasswordInput = (props: PegaExtensionsPasswordInputProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_PasswordInput"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsPasswordInput);
