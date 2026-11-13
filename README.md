# Pega Constellation Components POC

A Pega DX Component Builder workspace containing the full component catalogue requested from the [Constellation UI Gallery](https://pegasystems.github.io/constellation-ui-gallery/?path=/docs/getting-started--docs).

**[Open the live Pega React component Storybook](https://aaqibhafeezkhan.github.io/PEGA-Components-POC/)**

The published site is the production Storybook build from this repository. It loads the actual React DX components from `src/components` and displays the existing component stories, rather than substituting hand-written HTML previews.

## Published Storybook

The public Storybook build is generated from the component source and `demo.stories.tsx` files. The stories provide the component props and local Pega context mocks needed to render each component in isolation, alongside the Cosmos theme and Storybook controls.

The public site does not connect to a Pega Infinity environment. Server actions, authenticated services, data pages and live case data still require a configured Pega runtime.

## GitHub Pages deployment

The `.github/workflows/deploy-storybook.yml` workflow:

1. Installs the locked npm dependencies with Node.js 24.
2. Validates the 56-component catalogue.
3. Builds Storybook from the actual React component stories.
4. Publishes the generated `storybook-static/` directory to GitHub Pages.

Pull requests run the catalogue validation and Storybook production build without publishing. Pushes to `main` deploy the built site, and the workflow can also be started manually from the Actions tab.

To enable deployment once, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.

## Component coverage

**56 components: 23 Fields, 20 Widgets and 13 Templates.**

### Fields

Actionable Button, Base 64 File Upload, Banner Input, Barcode, CPQ Tree, Case Reference, Checkbox Row, Checkbox Trigger, Display PDF, Iframe Wrapper, Image Magnify, JSON Editor, Markdown Editor, Masked Input, Meter, Password Input, QRCode, Scheduler, Signature Capture, Star Rating Input, Status Badge, Toggle, Trend Display.

### Widgets

Banner, Calendar, Camera Capture, Card Gallery, Case Launcher, Chat GenAI, Custom KPI Gauge, Display Attachments, Display Brackets, Event Listener, Gantt Chart, Image Carousel, Kanban Board, Language Switch, Network Diagram, OAuth Connect, Org Builder, Shortcuts, Task List, Utility List.

### Templates

Compare Table Layout, Dynamic Hierarchical Form, Dynamic Template, Editable Table Layout, Expandable Table, Field Group As Row, Form Full Width, Form With Vertical Stepper, Hierarchical Form As Tasks, Jaw Layout, Map, Range Slider, Rating Layout.

## Project structure

Each component is under `src/components/Pega_Extensions_<ComponentName>/` and includes its original Designer `config.json`, Pega React entry point, demo story, component documentation, tests and any supporting modules needed by that component.

Shared Pega utilities and ambient types live under `src/components/shared/` and `src/pega-globals.d.ts`. Storybook is configured in `.storybook/`. The component builder uses `tasks.config.json` and `@pega/custom-dx-components`.

## Getting started

**Requirements:** Node.js 24.x and npm 10 or later.

```bash
npm install
npm run validate:catalog
npm test -- --runInBand
npm run lint:types
npm run start
```

To build the DX component package:

```bash
npm run build
```

To build Storybook locally:

```bash
npm run build-storybook
```

The target Pega Infinity environment must be configured locally in `tasks.config.json` before running `npm run authenticate` or building/publishing components against a Pega server. The committed file intentionally contains blank server, client, password, certificate and key values. Do not commit credentials, private keys, certificates or environment files.

## Verification boundary

The repository's catalogue validator checks the component set, metadata consistency and required source files. Building Storybook verifies that its stories and component modules can be compiled into a static application.

A live Pega import/build still requires access to the target Infinity version, rulesets, authentication and application data pages.

## Source and licensing

Component implementations and component-level assets/docs originate from [Pegasystems/constellation-ui-gallery](https://github.com/pegasystems/constellation-ui-gallery), release 5.0.6. The upstream project is licensed under Apache License 2.0; the license is included in this repository. The local POC project structure is based on [AIOps-Capabilities-Hub/Pega-component-builder](https://github.com/AIOps-Capabilities-Hub/Pega-component-builder).

- [Live Constellation UI Gallery](https://pegasystems.github.io/constellation-ui-gallery/)
- [Pega DX Component Builder documentation](https://docs.pega.com/bundle/constellation-dx-components/page/constellation-dx-components/custom-components/whats-new-constellation-dx-component-builder.html)
