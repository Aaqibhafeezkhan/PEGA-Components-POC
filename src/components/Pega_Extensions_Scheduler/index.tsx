import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsSchedulerProps = Record<string, any>;

export const PegaExtensionsScheduler = (props: PegaExtensionsSchedulerProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_Scheduler"
    componentType="Field"
  />
);

export default withConfiguration(PegaExtensionsScheduler);
