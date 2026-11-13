import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCompareTableLayoutProps = Record<string, any>;

export const PegaExtensionsCompareTableLayout = (props: PegaExtensionsCompareTableLayoutProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_CompareTableLayout"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsCompareTableLayout);
