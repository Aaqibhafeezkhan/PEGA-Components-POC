import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsBarCodeProps = Record<string, any>;

export const PegaExtensionsBarCode = (props: PegaExtensionsBarCodeProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_BarCode"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsBarCode);
