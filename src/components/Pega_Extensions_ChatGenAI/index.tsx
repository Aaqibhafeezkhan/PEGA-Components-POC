import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsChatGenAIProps = Record<string, any>;

export const PegaExtensionsChatGenAI = (props: PegaExtensionsChatGenAIProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_ChatGenAI"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsChatGenAI);
