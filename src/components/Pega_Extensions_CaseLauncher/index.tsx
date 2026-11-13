import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCaseLauncherProps = Record<string, any>;

export const PegaExtensionsCaseLauncher = (props: PegaExtensionsCaseLauncherProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_CaseLauncher"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsCaseLauncher);
