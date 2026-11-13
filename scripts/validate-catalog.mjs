import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/components', import.meta.url));
const folders = readdirSync(root, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && entry.name.startsWith('Pega_Extensions_'))
  .map(entry => entry.name)
  .sort();

const expected = [
  'Pega_Extensions_ActionableButton','Pega_Extensions_B64FileUpload','Pega_Extensions_Banner','Pega_Extensions_BannerInput',
  'Pega_Extensions_BarCode','Pega_Extensions_CPQTree','Pega_Extensions_Calendar','Pega_Extensions_CameraCapture',
  'Pega_Extensions_CardGallery','Pega_Extensions_CaseLauncher','Pega_Extensions_CaseReference','Pega_Extensions_ChatGenAI',
  'Pega_Extensions_CheckboxRow','Pega_Extensions_CheckboxTrigger','Pega_Extensions_CompareTableLayout','Pega_Extensions_CustomKPIGauge',
  'Pega_Extensions_DisplayAttachments','Pega_Extensions_DisplayBrackets','Pega_Extensions_DisplayPDF','Pega_Extensions_DynamicHierarchicalForm',
  'Pega_Extensions_DynamicTemplate','Pega_Extensions_EditableTableLayout','Pega_Extensions_EventListener','Pega_Extensions_ExpandableTable',
  'Pega_Extensions_FieldGroupAsRow','Pega_Extensions_FormFullWidth','Pega_Extensions_FormWithVerticalStepper','Pega_Extensions_GanttChart',
  'Pega_Extensions_HierarchicalFormAsTasks','Pega_Extensions_IframeWrapper','Pega_Extensions_ImageCarousel','Pega_Extensions_ImageMagnify',
  'Pega_Extensions_JawLayout','Pega_Extensions_JsonEditor','Pega_Extensions_KanbanBoard','Pega_Extensions_LangSwitch',
  'Pega_Extensions_Map','Pega_Extensions_MarkdownInput','Pega_Extensions_MaskedInput','Pega_Extensions_Meter',
  'Pega_Extensions_NetworkDiagram','Pega_Extensions_OAuthConnect','Pega_Extensions_OrgBuilder','Pega_Extensions_PasswordInput',
  'Pega_Extensions_QRCode','Pega_Extensions_RangeSlider','Pega_Extensions_RatingLayout','Pega_Extensions_Scheduler',
  'Pega_Extensions_Shortcuts','Pega_Extensions_SignatureCapture','Pega_Extensions_StarRatingInput','Pega_Extensions_StatusBadge',
  'Pega_Extensions_TaskList','Pega_Extensions_Toggle','Pega_Extensions_TrendDisplay','Pega_Extensions_UtilityList'
].sort();

if (folders.length !== expected.length) throw new Error('Expected ' + expected.length + ' components, found ' + folders.length);
const missing = expected.filter(name => !folders.includes(name));
const unexpected = folders.filter(name => !expected.includes(name));
if (missing.length || unexpected.length) throw new Error('Catalogue mismatch. Missing: ' + missing.join(', ') + '. Unexpected: ' + unexpected.join(', '));

const counts = { Field: 0, Widget: 0, Template: 0 };
let stories = 0;
let tests = 0;
for (const folder of folders) {
  const dir = join(root, folder);
  const configPath = join(dir, 'config.json');
  const sourcePath = join(dir, 'index.tsx');
  const docsPath = join(dir, 'Docs.mdx');
  const storyPath = join(dir, 'demo.stories.tsx');
  const testPath = join(dir, 'demo.test.tsx');
  for (const path of [configPath, sourcePath, docsPath, storyPath]) if (!existsSync(path)) throw new Error('Required component file missing: ' + path);
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const source = readFileSync(sourcePath, 'utf8');
  if (config.name !== folder || config.componentKey !== folder) throw new Error('Component key mismatch: ' + folder);
  if (!Object.prototype.hasOwnProperty.call(counts, config.type)) throw new Error('Unsupported type for ' + folder + ': ' + config.type);
  if (!source.includes('withConfiguration') || !source.includes('export default')) throw new Error('Missing Pega registration/default export: ' + folder);
  counts[config.type] += 1;
  stories += existsSync(storyPath) ? 1 : 0;
  tests += existsSync(testPath) ? 1 : 0;
}
const requiredCounts = { Field: 23, Widget: 20, Template: 13 };
for (const [type, count] of Object.entries(requiredCounts)) if (counts[type] !== count) throw new Error(type + ' count mismatch: expected ' + count + ', found ' + counts[type]);
console.log('Validated ' + folders.length + ' gallery components.');
console.log('Fields: ' + counts.Field + ', Widgets: ' + counts.Widget + ', Templates: ' + counts.Template);
console.log('Demo stories: ' + stories + ', component test files: ' + tests);
