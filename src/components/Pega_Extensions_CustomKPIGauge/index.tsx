import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCustomKPIGaugeProps = Record<string, any>;

export const PegaExtensionsCustomKPIGauge = (props: PegaExtensionsCustomKPIGaugeProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_CustomKPIGauge"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsCustomKPIGauge);
