import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsMarkdownInputProps = Record<string, any>;

export const PegaExtensionsMarkdownInput = (props: PegaExtensionsMarkdownInputProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_MarkdownInput"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsMarkdownInput);
