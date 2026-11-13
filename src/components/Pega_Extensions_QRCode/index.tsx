import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsQRCodeProps = Record<string, any>;

export const PegaExtensionsQRCode = (props: PegaExtensionsQRCodeProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_QRCode"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsQRCode);
