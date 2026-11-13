import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsJsonEditorProps = Record<string, any>;

export const PegaExtensionsJsonEditor = (props: PegaExtensionsJsonEditorProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_JsonEditor"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsJsonEditor);
