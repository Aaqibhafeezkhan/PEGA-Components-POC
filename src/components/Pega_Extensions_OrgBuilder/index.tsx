import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsOrgBuilderProps = Record<string, any>;

export const PegaExtensionsOrgBuilder = (props: PegaExtensionsOrgBuilderProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_OrgBuilder"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsOrgBuilder);
