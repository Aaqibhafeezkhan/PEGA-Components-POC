import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsDisplayPDFProps = Record<string, any>;

export const PegaExtensionsDisplayPDF = (props: PegaExtensionsDisplayPDFProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_DisplayPDF"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsDisplayPDF);
