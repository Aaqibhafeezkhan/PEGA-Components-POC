import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsFieldGroupAsRowProps = Record<string, any>;

export const PegaExtensionsFieldGroupAsRow = (props: PegaExtensionsFieldGroupAsRowProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_FieldGroupAsRow"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsFieldGroupAsRow);
