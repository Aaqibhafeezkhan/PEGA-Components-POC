import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/components', import.meta.url));
const folders = readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name);
const components = folders.map(folder => {
  const configPath = join(root, folder, 'config.json');
  const sourcePath = join(root, folder, 'index.tsx');
  const docsPath = join(root, folder, 'Docs.mdx');
  if (!existsSync(configPath) || !existsSync(sourcePath) || !existsSync(docsPath)) throw new Error('Incomplete component folder: ' + folder);
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const source = readFileSync(sourcePath, 'utf8');
  if (config.name !== folder || config.componentKey !== folder) throw new Error('Component key mismatch: ' + folder);
  if (!['Field', 'Widget', 'Template'].includes(config.type)) throw new Error('Invalid component type: ' + folder);
  if (!source.includes('PegaComponentRuntime') || !source.includes('withConfiguration')) throw new Error('Missing runtime adapter: ' + folder);
  return config;
});
const counts = components.reduce((result, component) => {
  result[component.type] = (result[component.type] || 0) + 1;
  return result;
}, {});
if (components.length !== 56) throw new Error('Expected 56 gallery components, found ' + components.length);
for (const type of ['Field', 'Widget', 'Template']) if (!counts[type]) throw new Error('Missing component category: ' + type);
console.log('Validated ' + components.length + ' components: ' + Object.entries(counts).map(([type, count]) => type + '=' + count).join(', '));
