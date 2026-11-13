import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCaseReferenceProps = Record<string, any>;

export const PegaExtensionsCaseReference = (props: PegaExtensionsCaseReferenceProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_CaseReference"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsCaseReference);
