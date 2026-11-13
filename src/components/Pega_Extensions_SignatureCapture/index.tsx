import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsSignatureCaptureProps = Record<string, any>;

export const PegaExtensionsSignatureCapture = (props: PegaExtensionsSignatureCaptureProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_SignatureCapture"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsSignatureCapture);
