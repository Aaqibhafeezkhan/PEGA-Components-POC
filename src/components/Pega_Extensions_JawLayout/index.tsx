import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsJawLayoutProps = Record<string, any>;

export const PegaExtensionsJawLayout = (props: PegaExtensionsJawLayoutProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_JawLayout"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsJawLayout);
