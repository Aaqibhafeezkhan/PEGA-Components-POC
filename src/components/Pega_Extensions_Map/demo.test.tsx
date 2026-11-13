import metadata from './config.json';

describe('Map template metadata', () => {
  it('registers the Map component as a form template', () => {
    expect(metadata.name).toBe('Pega_Extensions_Map');
    expect(metadata.componentKey).toBe('Pega_Extensions_Map');
    expect(metadata.type).toBe('Template');
    expect(metadata.subtype).toBe('FORM');
    expect(metadata.defaultConfig.bFreeFormDrawing).toBe(false);
  });
});
