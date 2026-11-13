import { withConfiguration } from '@pega/cosmos-react-core';
import { PegaComponentRuntime } from '../shared/PegaComponentRuntime';
import type { PegaRuntimeProps } from '../shared/PegaComponentRuntime';
import '../shared/create-nonce';

export type PegaExtensionsUtilityListProps = Record<string, any>;

export const PegaExtensionsUtilityList = (props: PegaExtensionsUtilityListProps) => (
  <PegaComponentRuntime
    {...(props as PegaRuntimeProps)}
    componentKey="Pega_Extensions_UtilityList"
    componentType="Widget"
  />
);

export default withConfiguration(PegaExtensionsUtilityList);
