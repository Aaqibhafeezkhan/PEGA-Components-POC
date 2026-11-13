import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsStatusBadgeProps = Record<string, any>;

export const PegaExtensionsStatusBadge = (props: PegaExtensionsStatusBadgeProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_StatusBadge"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsStatusBadge);
