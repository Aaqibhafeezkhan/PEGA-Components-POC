import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCameraCaptureProps = Record<string, any>;

export const PegaExtensionsCameraCapture = (props: PegaExtensionsCameraCaptureProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_CameraCapture"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsCameraCapture);
