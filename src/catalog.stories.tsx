import React from 'react';
import PegaExtensionsActionableButton from './components/Pega_Extensions_ActionableButton';
import PegaExtensionsB64FileUpload from './components/Pega_Extensions_B64FileUpload';
import PegaExtensionsBanner from './components/Pega_Extensions_Banner';
import PegaExtensionsBannerInput from './components/Pega_Extensions_BannerInput';
import PegaExtensionsBarCode from './components/Pega_Extensions_BarCode';
import PegaExtensionsCPQTree from './components/Pega_Extensions_CPQTree';
import PegaExtensionsCalendar from './components/Pega_Extensions_Calendar';
import PegaExtensionsCameraCapture from './components/Pega_Extensions_CameraCapture';
import PegaExtensionsCardGallery from './components/Pega_Extensions_CardGallery';
import PegaExtensionsCaseLauncher from './components/Pega_Extensions_CaseLauncher';
import PegaExtensionsCaseReference from './components/Pega_Extensions_CaseReference';
import PegaExtensionsChatGenAI from './components/Pega_Extensions_ChatGenAI';
import PegaExtensionsCheckboxRow from './components/Pega_Extensions_CheckboxRow';
import PegaExtensionsCheckboxTrigger from './components/Pega_Extensions_CheckboxTrigger';
import PegaExtensionsCompareTableLayout from './components/Pega_Extensions_CompareTableLayout';
import PegaExtensionsCustomKPIGauge from './components/Pega_Extensions_CustomKPIGauge';
import PegaExtensionsDisplayAttachments from './components/Pega_Extensions_DisplayAttachments';
import PegaExtensionsDisplayBrackets from './components/Pega_Extensions_DisplayBrackets';
import PegaExtensionsDisplayPDF from './components/Pega_Extensions_DisplayPDF';
import PegaExtensionsDynamicHierarchicalForm from './components/Pega_Extensions_DynamicHierarchicalForm';
import PegaExtensionsDynamicTemplate from './components/Pega_Extensions_DynamicTemplate';
import PegaExtensionsEditableTableLayout from './components/Pega_Extensions_EditableTableLayout';
import PegaExtensionsEventListener from './components/Pega_Extensions_EventListener';
import PegaExtensionsExpandableTable from './components/Pega_Extensions_ExpandableTable';
import PegaExtensionsFieldGroupAsRow from './components/Pega_Extensions_FieldGroupAsRow';
import PegaExtensionsFormFullWidth from './components/Pega_Extensions_FormFullWidth';
import PegaExtensionsFormWithVerticalStepper from './components/Pega_Extensions_FormWithVerticalStepper';
import PegaExtensionsGanttChart from './components/Pega_Extensions_GanttChart';
import PegaExtensionsHierarchicalFormAsTasks from './components/Pega_Extensions_HierarchicalFormAsTasks';
import PegaExtensionsIframeWrapper from './components/Pega_Extensions_IframeWrapper';
import PegaExtensionsImageCarousel from './components/Pega_Extensions_ImageCarousel';
import PegaExtensionsImageMagnify from './components/Pega_Extensions_ImageMagnify';
import PegaExtensionsJawLayout from './components/Pega_Extensions_JawLayout';
import PegaExtensionsJsonEditor from './components/Pega_Extensions_JsonEditor';
import PegaExtensionsKanbanBoard from './components/Pega_Extensions_KanbanBoard';
import PegaExtensionsLangSwitch from './components/Pega_Extensions_LangSwitch';
import PegaExtensionsMap from './components/Pega_Extensions_Map';
import PegaExtensionsMarkdownInput from './components/Pega_Extensions_MarkdownInput';
import PegaExtensionsMaskedInput from './components/Pega_Extensions_MaskedInput';
import PegaExtensionsMeter from './components/Pega_Extensions_Meter';
import PegaExtensionsNetworkDiagram from './components/Pega_Extensions_NetworkDiagram';
import PegaExtensionsOAuthConnect from './components/Pega_Extensions_OAuthConnect';
import PegaExtensionsOrgBuilder from './components/Pega_Extensions_OrgBuilder';
import PegaExtensionsPasswordInput from './components/Pega_Extensions_PasswordInput';
import PegaExtensionsQRCode from './components/Pega_Extensions_QRCode';
import PegaExtensionsRangeSlider from './components/Pega_Extensions_RangeSlider';
import PegaExtensionsRatingLayout from './components/Pega_Extensions_RatingLayout';
import PegaExtensionsScheduler from './components/Pega_Extensions_Scheduler';
import PegaExtensionsShortcuts from './components/Pega_Extensions_Shortcuts';
import PegaExtensionsSignatureCapture from './components/Pega_Extensions_SignatureCapture';
import PegaExtensionsStarRatingInput from './components/Pega_Extensions_StarRatingInput';
import PegaExtensionsStatusBadge from './components/Pega_Extensions_StatusBadge';
import PegaExtensionsTaskList from './components/Pega_Extensions_TaskList';
import PegaExtensionsToggle from './components/Pega_Extensions_Toggle';
import PegaExtensionsTrendDisplay from './components/Pega_Extensions_TrendDisplay';
import PegaExtensionsUtilityList from './components/Pega_Extensions_UtilityList';

const getPConnect = () => ({
  getStateProps: () => ({ value: 'pyExample' }),
  getActionsApi: () => ({ updateFieldValue: () => undefined, triggerFieldChange: () => undefined, openLocalAction: () => undefined, createWork: () => undefined }),
  getContextName: () => 'app/primary',
  getValue: () => undefined,
  getLocalizedValue: (value: string) => value
});

const components = [
  { name: "Actionable button", type: "Field", Component: PegaExtensionsActionableButton },
  { name: "Base 64 File Upload Component", type: "Field", Component: PegaExtensionsB64FileUpload },
  { name: "Banner", type: "Widget", Component: PegaExtensionsBanner },
  { name: "Banner Input", type: "Field", Component: PegaExtensionsBannerInput },
  { name: "BarCode", type: "Field", Component: PegaExtensionsBarCode },
  { name: "CPQ tree", type: "Field", Component: PegaExtensionsCPQTree },
  { name: "Calendar", type: "Widget", Component: PegaExtensionsCalendar },
  { name: "Camera Capture", type: "Widget", Component: PegaExtensionsCameraCapture },
  { name: "Card Gallery", type: "Widget", Component: PegaExtensionsCardGallery },
  { name: "Case Launcher", type: "Widget", Component: PegaExtensionsCaseLauncher },
  { name: "Case reference", type: "Field", Component: PegaExtensionsCaseReference },
  { name: "Chat Gen AI", type: "Widget", Component: PegaExtensionsChatGenAI },
  { name: "Checkbox Row", type: "Field", Component: PegaExtensionsCheckboxRow },
  { name: "Checkbox Trigger", type: "Field", Component: PegaExtensionsCheckboxTrigger },
  { name: "Comparison Table Layout", type: "Template", Component: PegaExtensionsCompareTableLayout },
  { name: "Custom KPI Gauge", type: "Widget", Component: PegaExtensionsCustomKPIGauge },
  { name: "Display Attachments", type: "Widget", Component: PegaExtensionsDisplayAttachments },
  { name: "Display Brackets", type: "Widget", Component: PegaExtensionsDisplayBrackets },
  { name: "Display PDF", type: "Field", Component: PegaExtensionsDisplayPDF },
  { name: "Dynamic Hierarchical Form", type: "Template", Component: PegaExtensionsDynamicHierarchicalForm },
  { name: "Dynamic Template", type: "Template", Component: PegaExtensionsDynamicTemplate },
  { name: "Editable Table Layout", type: "Template", Component: PegaExtensionsEditableTableLayout },
  { name: "Event Listener", type: "Widget", Component: PegaExtensionsEventListener },
  { name: "Expandable Table", type: "Template", Component: PegaExtensionsExpandableTable },
  { name: "Field Group As Row", type: "Template", Component: PegaExtensionsFieldGroupAsRow },
  { name: "Form Full Width", type: "Template", Component: PegaExtensionsFormFullWidth },
  { name: "Form with Vertical Stepper", type: "Template", Component: PegaExtensionsFormWithVerticalStepper },
  { name: "Gantt Chart", type: "Widget", Component: PegaExtensionsGanttChart },
  { name: "Hierarchical Form as Tasks", type: "Template", Component: PegaExtensionsHierarchicalFormAsTasks },
  { name: "IFrame Wrapper", type: "Field", Component: PegaExtensionsIframeWrapper },
  { name: "Image carousel", type: "Widget", Component: PegaExtensionsImageCarousel },
  { name: "Image Magnify", type: "Field", Component: PegaExtensionsImageMagnify },
  { name: "Jaw Layout", type: "Template", Component: PegaExtensionsJawLayout },
  { name: "JSON editor", type: "Field", Component: PegaExtensionsJsonEditor },
  { name: "Kanban Board", type: "Widget", Component: PegaExtensionsKanbanBoard },
  { name: "Language Switch", type: "Widget", Component: PegaExtensionsLangSwitch },
  { name: "ESRI Map Component", type: "Template", Component: PegaExtensionsMap },
  { name: "Markdown editor", type: "Field", Component: PegaExtensionsMarkdownInput },
  { name: "Masked Input", type: "Field", Component: PegaExtensionsMaskedInput },
  { name: "Meter", type: "Field", Component: PegaExtensionsMeter },
  { name: "Network Diagram", type: "Widget", Component: PegaExtensionsNetworkDiagram },
  { name: "OAuth Connect", type: "Widget", Component: PegaExtensionsOAuthConnect },
  { name: "Org Builder", type: "Widget", Component: PegaExtensionsOrgBuilder },
  { name: "Password", type: "Field", Component: PegaExtensionsPasswordInput },
  { name: "QRCode", type: "Field", Component: PegaExtensionsQRCode },
  { name: "Range Slider", type: "Template", Component: PegaExtensionsRangeSlider },
  { name: "Rating Layout", type: "Template", Component: PegaExtensionsRatingLayout },
  { name: "Scheduler", type: "Field", Component: PegaExtensionsScheduler },
  { name: "Shortcuts", type: "Widget", Component: PegaExtensionsShortcuts },
  { name: "Signature Capture", type: "Field", Component: PegaExtensionsSignatureCapture },
  { name: "Rating", type: "Field", Component: PegaExtensionsStarRatingInput },
  { name: "Status Badge", type: "Field", Component: PegaExtensionsStatusBadge },
  { name: "TaskList", type: "Widget", Component: PegaExtensionsTaskList },
  { name: "Toggle", type: "Field", Component: PegaExtensionsToggle },
  { name: "Trend Display", type: "Field", Component: PegaExtensionsTrendDisplay },
  { name: "Utility List", type: "Widget", Component: PegaExtensionsUtilityList },
];

const Catalogue = () => (
  <main style={{ display: 'grid', gap: 24, padding: 24, background: '#f5f7f9' }}>
    <header>
      <h1>Constellation component catalogue</h1>
      <p>56 Fields, Widgets and Templates from the Pega gallery metadata.</p>
    </header>
    {(['Field', 'Widget', 'Template'] as const).map(type => (
      <section key={type}>
        <h2>{type}s</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {components.filter(item => item.type === type).map(item => {
            const Component = item.Component as React.ComponentType<any>;
            return (
              <article key={item.name} style={{ padding: 14, background: '#fff', border: '1px solid #d7dce2', borderRadius: 8 }}>
                <h3>{item.name}</h3>
                <Component label={item.name} heading={item.name} caption={item.name} value="Example value" getPConnect={getPConnect}>
                  <p>Template content preview</p>
                </Component>
              </article>
            );
          })}
        </div>
      </section>
    ))}
  </main>
);

export default { title: 'Constellation UI Gallery/All components' };
export const AllComponents = () => <Catalogue />;
