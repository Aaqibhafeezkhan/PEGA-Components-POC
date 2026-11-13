# Pega Components POC

A component workspace for Pega Constellation DX extensions. It contains the **56 Field, Widget, and Template entries** in the Constellation UI Gallery 5.0.6 catalogue, organized in the component-per-folder structure used by DX Component Builder.

## Catalogue

| Type | Components |
|---|---:|
| Field | 23 |
| Widget | 20 |
| Template | 13 |
| **Total** | **56** |

Each folder under `src/components` contains:
- `config.json`: Designer metadata, component type/subtype and property-panel definitions.
- `index.tsx`: Pega component entry point registered with `withConfiguration`.
- `Docs.mdx`: component-specific reference notes.

The entry points share `src/components/shared/PegaComponentRuntime.tsx` for consistent PConnect value handling, data-page reads, and category-specific rendering.

## References

- Structure and build workflow: [AIOps-Capabilities-Hub/Pega-component-builder](https://github.com/AIOps-Capabilities-Hub/Pega-component-builder)
- Component catalogue and metadata: [pegasystems/constellation-ui-gallery](https://github.com/pegasystems/constellation-ui-gallery)
- Live gallery: [Constellation UI Gallery](https://pegasystems.github.io/constellation-ui-gallery/)
- Pega DX component builder documentation: [Pega documentation](https://docs.pega.com/bundle/constellation-dx-components/page/constellation-dx-components/custom-components/whats-new-constellation-dx-component-builder.html)

The catalogue metadata follows the gallery's 5.0.6 / Pega Infinity 26.1.1 line. Review the target Pega environment and update the package versions and component configuration before importing into another platform release.

## Requirements

- Node.js 24.x
- npm 10 or later
- Pega Infinity 26.1.x for platform-side validation

## Setup

```bash
npm install
npm run validate:catalog
npm test
npm run typecheck
npm run build
```

To build a single component with the DX Component Builder CLI:

```bash
npm run build:component
```

## Pega environment configuration

Edit `tasks.config.json` locally to supply your Pega server, ruleset and authentication details before running `npm run authenticate`. Keep credentials, certificates, private keys and local `.env` files out of Git. The committed configuration deliberately contains blank connection values.

## Runtime integration notes

This is a POC adapter layer for the gallery catalogue, not a claim that every gallery-specific integration has been certified in a live Pega application. Components that depend on platform messaging, OAuth providers, signatures, media encoders, data pages, case actions or third-party services need their corresponding environment-specific configuration and end-to-end validation. The QR/barcode and signature surfaces are preview adapters until those integrations are connected.

For production use, test every component against the target Infinity version, application rulesets, accessibility requirements, security policies and actual data-page contracts.
