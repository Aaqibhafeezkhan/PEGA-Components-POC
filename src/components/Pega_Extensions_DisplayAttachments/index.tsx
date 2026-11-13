import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsDisplayAttachmentsProps = Record<string, any>;

export const PegaExtensionsDisplayAttachments = (props: PegaExtensionsDisplayAttachmentsProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_DisplayAttachments"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsDisplayAttachments);
