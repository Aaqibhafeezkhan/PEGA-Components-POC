import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsCalendarProps = Record<string, any>;

export const PegaExtensionsCalendar = (props: PegaExtensionsCalendarProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_Calendar"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsCalendar);
