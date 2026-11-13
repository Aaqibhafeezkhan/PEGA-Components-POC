import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsTaskListProps = Record<string, any>;

export const PegaExtensionsTaskList = (props: PegaExtensionsTaskListProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_TaskList"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsTaskList);
