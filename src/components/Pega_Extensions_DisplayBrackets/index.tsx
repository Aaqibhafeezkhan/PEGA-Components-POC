import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsDisplayBracketsProps = Record<string, any>;

export const PegaExtensionsDisplayBrackets = (props: PegaExtensionsDisplayBracketsProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_DisplayBrackets"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsDisplayBrackets);
