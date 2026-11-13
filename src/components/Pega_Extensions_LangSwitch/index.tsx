import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsLangSwitchProps = Record<string, any>;

export const PegaExtensionsLangSwitch = (props: PegaExtensionsLangSwitchProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_LangSwitch"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsLangSwitch);
