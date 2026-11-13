import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsKanbanBoardProps = Record<string, any>;

export const PegaExtensionsKanbanBoard = (props: PegaExtensionsKanbanBoardProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_KanbanBoard"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsKanbanBoard);
