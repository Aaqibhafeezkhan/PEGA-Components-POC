import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsDynamicTemplateProps = Record<string, any>;

export const PegaExtensionsDynamicTemplate = (props: PegaExtensionsDynamicTemplateProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_DynamicTemplate"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsDynamicTemplate);
