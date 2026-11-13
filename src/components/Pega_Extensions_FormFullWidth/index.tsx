import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsFormFullWidthProps = Record<string, any>;

export const PegaExtensionsFormFullWidth = (props: PegaExtensionsFormFullWidthProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_FormFullWidth"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsFormFullWidth);
