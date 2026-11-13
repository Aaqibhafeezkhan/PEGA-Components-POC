import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsB64FileUploadProps = Record<string, any>;

export const PegaExtensionsB64FileUpload = (props: PegaExtensionsB64FileUploadProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_B64FileUpload"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsB64FileUpload);
