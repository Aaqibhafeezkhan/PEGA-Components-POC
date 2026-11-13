import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsShortcutsProps = Record<string, any>;

export const PegaExtensionsShortcuts = (props: PegaExtensionsShortcutsProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_Shortcuts"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsShortcuts);
