import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsGanttChartProps = Record<string, any>;

export const PegaExtensionsGanttChart = (props: PegaExtensionsGanttChartProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_GanttChart"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsGanttChart);
