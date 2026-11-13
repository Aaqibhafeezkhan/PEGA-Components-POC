import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsEditableTableLayoutProps = Record<string, any>;

export const PegaExtensionsEditableTableLayout = (props: PegaExtensionsEditableTableLayoutProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_EditableTableLayout"
    componentType="Template"
  />
);

export default withConfiguration(PegaExtensionsEditableTableLayout);
