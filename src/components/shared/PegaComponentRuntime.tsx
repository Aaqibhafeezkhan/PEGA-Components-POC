import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from 'react';

export type PegaRuntimeProps = Record<string, any> & {
  componentKey: string;
  componentType: 'Field' | 'Widget' | 'Template';
  getPConnect?: () => any;
};

const truthy = (value: unknown): boolean => value === true || value === 'true';
const text = (value: unknown, fallback = ''): string => value === undefined || value === null ? fallback : String(value);
const asArray = (value: unknown): any[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && typeof parsed === 'object') return Object.values(parsed);
    } catch {
      return value ? [value] : [];
    }
  }
  if (value && typeof value === 'object') return Object.values(value as Record<string, any>);
  return [];
};
const safeJson = (value: unknown): any => {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return value; }
};
const keyName = (name: string): string => {
  try {
    if (typeof PCore !== 'undefined') {
      const qualified = PCore.getNameSpaceUtils?.().getDefaultQualifiedName?.(name);
      const mapped = qualified && PCore.getEnvironmentInfo?.().getKeyMapping?.(qualified);
      return mapped || qualified || name;
    }
  } catch {
    return name;
  }
  return name;
};
const titleOf = (item: any, fallback: string): string =>
  text(item?.pyLabel || item?.label || item?.name || item?.title || item?.pyID || item?.id, fallback);
const Shell = ({ title, children }: { title?: string; children: ReactNode }) => (
  <section style={{ border: '1px solid #d7dce2', borderRadius: 8, padding: 16, background: '#fff', color: '#202a35', minWidth: 0 }}>
    {title ? <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600 }}>{title}</h3> : null}
    {children}
  </section>
);
const ActionButton = ({ children, onClick, disabled = false }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) => (
  <button type="button" onClick={onClick} disabled={disabled} style={{ border: 0, borderRadius: 6, padding: '9px 14px', background: disabled ? '#aab4bf' : '#1766a6', color: '#fff', cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 600 }}>
    {children}
  </button>
);
const ItemList = ({ items }: { items: any[] }) => (
  <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
    {items.map((item, index) => <li key={text(item?.pzInsKey || item?.id, String(index))}>{titleOf(item, 'Item ' + (index + 1))}</li>)}
  </ul>
);
const TableView = ({ rows }: { rows: any[] }) => {
  const columns = Array.from(new Set(rows.flatMap(row => Object.keys(row || {})))).slice(0, 8);
  if (!rows.length) return <p style={{ margin: 0, color: '#5d6875' }}>No records available.</p>;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
        <thead><tr>{columns.map(column => <th key={column} style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ccd3dc' }}>{column}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={text(row?.pzInsKey || row?.id, String(index))}>{columns.map(column => <td key={column} style={{ padding: 8, borderBottom: '1px solid #e5e9ee' }}>{text(row?.[column])}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
};

export const PegaComponentRuntime = (props: PegaRuntimeProps) => {
  const {
    componentKey, componentType, getPConnect, value, label, caption, heading, helperText,
    validatemessage, placeholder, readOnly, disabled, required, hideLabel, testId,
    dataPage, minValue, maxValue, min, max, step, imageUrl, url, mapUrl, authUrl,
    createClassname, createClassName, localAction, variant, displayMode, ...config
  } = props;
  const pConn = useMemo(() => {
    try { return getPConnect?.(); } catch { return undefined; }
  }, [getPConnect]);
  const [currentValue, setCurrentValue] = useState<any>(value ?? '');
  const [rows, setRows] = useState<any[]>([]);
  const [loadError, setLoadError] = useState('');
  const [draft, setDraft] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => setCurrentValue(value ?? ''), [value]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!dataPage || typeof PCore === 'undefined') return;
      try {
        const context = pConn?.getContextName?.();
        const result = await PCore.getDataApiUtils?.().getData?.(keyName(text(dataPage)), {}, context);
        const data = result?.data?.data ?? result?.data ?? result;
        const nextRows = Array.isArray(data) ? data : asArray(data?.pxResults ?? data?.results ?? data?.items ?? data);
        if (!cancelled) setRows(nextRows);
      } catch {
        if (!cancelled) setLoadError('The configured data page could not be loaded in this context.');
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [dataPage, pConn]);

  const updateValue = (nextValue: any) => {
    setCurrentValue(nextValue);
    try {
      const stateProps = pConn?.getStateProps?.();
      const propertyName = stateProps?.value;
      if (propertyName) pConn?.getActionsApi?.().updateFieldValue?.(propertyName, nextValue);
    } catch {
      setLoadError('The field value changed locally but could not be sent to the Pega action API.');
    }
  };

  const triggerChange = () => {
    try {
      const propertyName = pConn?.getStateProps?.()?.value;
      if (propertyName) pConn?.getActionsApi?.().triggerFieldChange?.(propertyName, currentValue);
    } catch {
      setLoadError('The field change could not be committed through the Pega action API.');
    }
  };

  const componentName = componentKey.replace('Pega_Extensions_', '');
  const fieldLabel = text(label || caption || heading, componentName.replace(/([A-Z])/g, ' $1').trim());
  const isReadOnly = truthy(readOnly) || displayMode === 'DISPLAY_ONLY';
  const isDisabled = truthy(disabled) || isReadOnly;
  const info = text(validatemessage || helperText);
  const inputStyle = { width: '100%', boxSizing: 'border-box' as const, border: '1px solid #9aa6b2', borderRadius: 6, padding: '9px 10px', font: 'inherit' };
  const fieldFrame = (control: ReactNode) => (
    <div style={{ display: 'grid', gap: 6, width: '100%' }}>
      {!truthy(hideLabel) ? <label htmlFor={text(testId, componentName)} style={{ fontWeight: 600 }}>{fieldLabel}{truthy(required) ? ' *' : ''}</label> : null}
      {control}
      {info ? <small style={{ color: validatemessage ? '#a32626' : '#596674' }} role={validatemessage ? 'alert' : undefined}>{info}</small> : null}
      {loadError ? <small role="status" style={{ color: '#a32626' }}>{loadError}</small> : null}
    </div>
  );
  const inputProps = {
    id: text(testId, componentName),
    name: text(pConn?.getStateProps?.()?.value, componentName),
    disabled: isDisabled,
    required: truthy(required),
    placeholder: text(placeholder),
    value: text(currentValue),
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => updateValue(event.target.value)
  };

  if (componentType === 'Field') {
    if (isReadOnly) {
      if (componentName === 'DisplayPDF' && text(currentValue || url)) {
        return <iframe title={fieldLabel} src={text(currentValue || url)} style={{ width: text(config.width, '100%'), height: Number(config.height || 420), border: '1px solid #d7dce2' }} />;
      }
      if (componentName === 'ImageMagnify' && text(currentValue || imageUrl)) {
        return <img src={text(currentValue || imageUrl)} alt={fieldLabel} style={{ maxWidth: '100%', maxHeight: 420, objectFit: 'contain' }} />;
      }
      if (componentName === 'StatusBadge') {
        return <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 20, background: '#e8eef5', color: '#24384d', fontWeight: 600 }}>{text(currentValue, '—')}</span>;
      }
      return <div aria-label={fieldLabel}>{text(currentValue, '—')}</div>;
    }

    if (componentName === 'ActionableButton') {
      const runAction = () => {
        try {
          pConn?.getActionsApi?.().openLocalAction?.(localAction, { caseID: pConn?.getValue?.(PCore.getConstants().CASE_INFO.CASE_INFO_ID), containerName: 'modal', type: 'express', name: fieldLabel });
        } catch { setLoadError('The local action could not be opened in this Pega context.'); }
      };
      return <ActionButton onClick={runAction} disabled={!localAction}>{fieldLabel}</ActionButton>;
    }

    if (componentName === 'CheckboxRow' || componentName === 'CheckboxTrigger' || componentName === 'Toggle') {
      return fieldFrame(
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <input type="checkbox" checked={truthy(currentValue)} disabled={isDisabled} onChange={event => updateValue(event.target.checked)} onBlur={triggerChange} />
          <span>{text(caption, fieldLabel)}</span>
        </label>
      );
    }

    if (componentName === 'StarRatingInput') {
      const rating = Number(currentValue || 0);
      const maximum = Number(config.maxRating || 5);
      return fieldFrame(
        <div role="radiogroup" aria-label={fieldLabel} style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: maximum }, (_, index) => index + 1).map(star => (
            <button key={star} type="button" disabled={isDisabled} aria-label={star + ' of ' + maximum} aria-pressed={rating === star} onClick={() => updateValue(star)} style={{ border: 0, background: 'transparent', color: star <= rating ? '#d18a00' : '#8a949f', fontSize: 26, cursor: isDisabled ? 'default' : 'pointer' }}>★</button>
          ))}
        </div>
      );
    }

    if (componentName === 'JsonEditor') {
      let valid = true;
      let jsonError = '';
      try { if (currentValue) JSON.parse(text(currentValue)); } catch (error) { valid = false; jsonError = error instanceof Error ? error.message : 'Invalid JSON'; }
      return fieldFrame(
        <div style={{ display: 'grid', gap: 6 }}>
          <textarea {...inputProps} rows={Number(config.rows || 10)} spellCheck={false} onChange={event => updateValue(event.target.value)} style={{ ...inputStyle, fontFamily: 'monospace', minHeight: 180 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <ActionButton disabled={!currentValue || !valid} onClick={() => updateValue(JSON.stringify(JSON.parse(text(currentValue)), null, Number(config.indent || 2)))}>Format JSON</ActionButton>
            <ActionButton disabled={!currentValue || !valid} onClick={() => updateValue(JSON.stringify(JSON.parse(text(currentValue))))}>Minify</ActionButton>
          </div>
          {!valid ? <small role="alert" style={{ color: '#a32626' }}>{jsonError}</small> : <small role="status">JSON is valid.</small>}
        </div>
      );
    }

    if (componentName === 'MarkdownInput') {
      return fieldFrame(
        <div style={{ display: 'grid', gap: 8 }}>
          <textarea value={text(currentValue)} onChange={event => updateValue(event.target.value)} onBlur={triggerChange} rows={8} disabled={isDisabled} placeholder={text(placeholder)} style={inputStyle} />
          <div style={{ border: '1px solid #d7dce2', borderRadius: 6, padding: 10 }}>
            <strong>Preview</strong><pre style={{ margin: '8px 0 0', whiteSpace: 'pre-wrap', font: 'inherit' }}>{text(currentValue)}</pre>
          </div>
        </div>
      );
    }

    if (componentName === 'B64FileUpload') {
      const fileChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => updateValue(String(reader.result || '').split(',')[1] || '');
        reader.onerror = () => setLoadError('The selected file could not be read.');
        reader.readAsDataURL(file);
      };
      return fieldFrame(<input type="file" disabled={isDisabled} onChange={fileChanged} />);
    }

    if (componentName === 'DisplayPDF' || componentName === 'IframeWrapper') {
      const source = text(currentValue || url || config.src || config.href);
      return fieldFrame(source ? <iframe title={fieldLabel} src={source} loading="lazy" sandbox="allow-scripts allow-forms allow-same-origin" style={{ width: '100%', height: Number(config.height || 420), border: '1px solid #d7dce2' }} /> : <p>No URL configured.</p>);
    }

    if (componentName === 'ImageMagnify') {
      const source = text(currentValue || imageUrl || url);
      return fieldFrame(source ? <img src={source} alt={fieldLabel} style={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain', cursor: 'zoom-in' }} /> : <p>No image configured.</p>);
    }

    if (componentName === 'Meter') {
      const numeric = Number(currentValue || 0);
      return fieldFrame(<div style={{ display: 'grid', gap: 4 }}><meter min={Number(minValue ?? min ?? 0)} max={Number(maxValue ?? max ?? 100)} value={numeric} style={{ width: '100%', height: 18 }} /><output>{numeric}</output></div>);
    }

    if (componentName === 'TrendDisplay') {
      const numeric = Number(currentValue || 0);
      const trend = Number(config.trendValue || 0);
      return fieldFrame(<div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong style={{ fontSize: 24 }}>{text(currentValue, '0')}</strong><span aria-label={trend > 0 ? 'Increasing' : trend < 0 ? 'Decreasing' : 'No change'}>{trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {Math.abs(trend)}%</span></div>);
    }

    if (componentName === 'StatusBadge') {
      return fieldFrame(<span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 20, background: '#e8eef5', color: '#24384d', fontWeight: 600 }}>{text(currentValue, '—')}</span>);
    }

    if (componentName === 'QRCode' || componentName === 'BarCode') {
      return fieldFrame(<div style={{ padding: 12, background: '#fff', border: '1px solid #d7dce2', display: 'inline-block', color: '#202a35' }}><code>{text(currentValue, 'Enter a value to preview')}</code><small style={{ display: 'block', marginTop: 6, color: '#596674' }}>Value preview only; connect a barcode/QR encoder for a scannable code.</small></div>);
    }

    if (componentName === 'CaseReference' || componentName === 'CPQTree') {
      const parsed = safeJson(currentValue);
      return fieldFrame(componentName === 'CPQTree' ? <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{JSON.stringify(parsed, null, 2)}</pre> : <span>{text(parsed, 'No case reference')}</span>);
    }

    if (componentName === 'SignatureCapture') {
      return fieldFrame(<div style={{ display: 'grid', gap: 6 }}><textarea value={text(currentValue)} onChange={event => updateValue(event.target.value)} onBlur={triggerChange} rows={4} placeholder="Signature payload or captured signature data" disabled={isDisabled} style={inputStyle} /><small>Connect a signature-pad implementation to capture drawn signatures.</small></div>);
    }

    const type = componentName === 'PasswordInput' ? 'password'
      : componentName === 'MaskedInput' ? 'text'
      : componentName === 'Scheduler' ? 'datetime-local'
      : componentName === 'BarCode' ? 'text'
      : componentName === 'ImageCarousel' ? 'url'
      : componentName === 'TrendDisplay' ? 'number'
      : ['Meter'].includes(componentName) ? 'number'
      : 'text';
    const genericInput = componentName === 'BannerInput'
      ? <div style={{ display: 'grid', gap: 8 }}><div role="status" style={{ padding: 10, background: '#eef4fa', borderRadius: 6 }}>{text(config.message, 'Enter a value below')}</div><input {...inputProps} onBlur={triggerChange} style={inputStyle} /></div>
      : <input {...inputProps} type={type} onBlur={triggerChange} style={inputStyle} />;
    return fieldFrame(genericInput);
  }

  if (componentType === 'Widget') {
    const title = text(heading, fieldLabel);
    if (componentName === 'EventListener') return null;
    if (componentName === 'Banner') {
      const messages = rows.length ? rows.map(row => text(row.pyDescription || row.message || row.label)).filter(Boolean) : asArray(config.messages).map(item => text(item));
      return <div role="status" aria-live="polite" style={{ padding: 12, borderRadius: 6, background: variant === 'warning' ? '#fff4d6' : variant === 'urgent' ? '#ffe7e7' : '#e8f4ff' }}>{messages.length ? messages.join(' ') : text(config.message, 'No messages to display.')}</div>;
    }
    if (componentName === 'CaseLauncher') {
      const targetClass = text(createClassname || createClassName || config.className);
      const launch = () => {
        try { pConn?.getActionsApi?.().createWork?.(targetClass, { openCaseViewAfterCreate: false }); }
        catch { setLoadError('The case could not be created in this Pega context.'); }
      };
      return <Shell title={title}><p>{text(config.description, 'Start a new case.')}</p><ActionButton disabled={!targetClass} onClick={launch}>{text(config.buttonLabel, 'Create case')}</ActionButton>{loadError ? <small role="alert">{loadError}</small> : null}</Shell>;
    }
    if (componentName === 'ChatGenAI') {
      const submit = () => { if (draft.trim()) { setChat(previous => [...previous, draft.trim()]); setDraft(''); } };
      return <Shell title={title}><div style={{ display: 'grid', gap: 8 }}>{chat.map((message, index) => <p key={index} style={{ margin: 0, padding: 8, background: '#f2f5f8', borderRadius: 6 }}>{message}</p>)}<input value={draft} onChange={event => setDraft(event.target.value)} placeholder="Enter a message" style={inputStyle} /><ActionButton onClick={submit}>Send</ActionButton><small>UI preview only; connect a Pega agent or approved model endpoint for responses.</small></div></Shell>;
    }
    if (componentName === 'CameraCapture') return <Shell title={title}><input type="file" accept="image/*" capture="environment" /></Shell>;
    if (componentName === 'Calendar') return <Shell title={title}><input aria-label="Select date" type="date" style={inputStyle} /><ItemList items={rows} /></Shell>;
    if (componentName === 'CustomKPIGauge') {
      const numeric = Number(rows[0]?.value ?? config.value ?? value ?? 0);
      return <Shell title={title}><strong style={{ fontSize: 32 }}>{numeric}</strong><progress max={Number(config.maximum || 100)} value={numeric} style={{ width: '100%', height: 16 }} /><small>{text(config.description, 'Configured KPI value')}</small></Shell>;
    }
    if (componentName === 'ImageCarousel') {
      const images = asArray(config.images || rows);
      const active = images[activeIndex % Math.max(1, images.length)];
      return <Shell title={title}>{active ? <img src={text(active.url || active.imageUrl || active.src)} alt={text(active.alt, 'Gallery image')} style={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain' }} /> : <p>No images configured.</p>}<div style={{ display: 'flex', gap: 8, marginTop: 8 }}><ActionButton disabled={!images.length} onClick={() => setActiveIndex(index => (index + images.length - 1) % images.length)}>Previous</ActionButton><ActionButton disabled={!images.length} onClick={() => setActiveIndex(index => (index + 1) % images.length)}>Next</ActionButton></div></Shell>;
    }
    if (componentName === 'LangSwitch') return <Shell title={title}><label>Language <select style={inputStyle} defaultValue={text(config.defaultLanguage, 'en')}><option value="en">English</option><option value="es">Español</option><option value="fr">Français</option><option value="de">Deutsch</option></select></label></Shell>;
    if (componentName === 'OAuthConnect') {
      const connect = () => { if (authUrl) window.open(text(authUrl), '_blank', 'noopener,noreferrer'); };
      return <Shell title={title}><p>{text(config.description, 'Connect an external service.')}</p><ActionButton disabled={!authUrl} onClick={connect}>Connect</ActionButton></Shell>;
    }
    if (componentName === 'GanttChart') return <Shell title={title}><div style={{ display: 'grid', gap: 10 }}>{rows.map((item, index) => <div key={index}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{titleOf(item, 'Task')}</strong><small>{text(item.startDate || item.start)} – {text(item.endDate || item.end)}</small></div><div style={{ height: 9, borderRadius: 6, background: '#e6ebf0', overflow: 'hidden' }}><div style={{ height: '100%', width: text(item.progress, '55') + '%', background: '#2878b9' }} /></div></div>)}</div></Shell>;
    if (componentName === 'KanbanBoard') {
      const statuses = Array.from(new Set(rows.map(item => text(item.status || item.pyStatusWork, 'Open'))));
      return <Shell title={title}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 10 }}>{(statuses.length ? statuses : ['Open']).map(status => <section key={status} style={{ padding: 8, background: '#f2f5f8', borderRadius: 6 }}><strong>{status}</strong><ItemList items={rows.filter(item => text(item.status || item.pyStatusWork, 'Open') === status)} /></section>)}</div></Shell>;
    }
    if (componentName === 'DisplayAttachments' || componentName === 'TaskList' || componentName === 'UtilityList' || componentName === 'Shortcuts') {
      return <Shell title={title}>{rows.length ? <ItemList items={rows} /> : <p>No items available.</p>}</Shell>;
    }
    if (componentName === 'DisplayBrackets' || componentName === 'OrgBuilder' || componentName === 'NetworkDiagram' || componentName === 'CPQTree') {
      return <Shell title={title}>{rows.length ? <ItemList items={rows} /> : <pre style={{ whiteSpace: 'pre-wrap' }}>{text(config.structure || config.data, 'Configure a data page or structure to display this view.')}</pre>}</Shell>;
    }
    if (componentName === 'CardGallery') return <Shell title={title}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>{rows.map((item, index) => <article key={index} style={{ border: '1px solid #d7dce2', borderRadius: 6, padding: 10 }}><strong>{titleOf(item, 'Card')}</strong><p>{text(item.description || item.pyDescription)}</p></article>)}</div></Shell>;
    return <Shell title={title}>{loadError ? <p role="alert">{loadError}</p> : rows.length ? <TableView rows={rows} /> : <p>Configure the data page to display records.</p>}</Shell>;
  }

  const children = props.children as ReactNode;
  if (componentName === 'FormFullWidth') {
    const columns = Math.max(1, Math.min(6, Number(config.NumCols || config.columns || 0) || 2));
    return <section style={{ width: '100%' }}><h3>{title}</h3><div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + columns + ', minmax(0,1fr))', gap: 16 }}>{children}</div></section>;
  }
  if (componentName === 'FieldGroupAsRow') return <section style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'start' }}>{children}</section>;
  if (componentName === 'CompareTableLayout' || componentName === 'EditableTableLayout') return <Shell title={title}><TableView rows={asArray(config.rows || config.data || rows)} />{children}</Shell>;
  if (componentName === 'ExpandableTable') return <Shell title={title}>{asArray(config.rows || rows).map((item, index) => <details key={index}><summary>{titleOf(item, 'Row ' + (index + 1))}</summary><pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(item, null, 2)}</pre></details>)}{children}</Shell>;
  if (componentName === 'FormWithVerticalStepper') return <Shell title={title}><ol style={{ display: 'grid', gap: 14, paddingLeft: 24 }}><li>{children}</li></ol></Shell>;
  if (componentName === 'HierarchicalFormAsTasks' || componentName === 'DynamicHierarchicalForm') return <Shell title={title}><div style={{ display: 'grid', gap: 8 }}>{asArray(config.tasks || config.items).map((item, index) => <details key={index}><summary>{titleOf(item, 'Task ' + (index + 1))}</summary><pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(item, null, 2)}</pre></details>)}{children}</div></Shell>;
  if (componentName === 'JawLayout') return <Shell title={title}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,minmax(28px,1fr))', gap: 5 }}>{Array.from({ length: 32 }, (_, index) => <button type="button" key={index} aria-label={'Tooth ' + (index + 1)} style={{ padding: 7, border: '1px solid #b9c3ce', borderRadius: 5, background: '#f8fafc' }}>{index + 1}</button>)}</div>{children}</Shell>;
  if (componentName === 'Map') return <Shell title={title}>{mapUrl ? <iframe title={title} src={text(mapUrl)} loading="lazy" style={{ width: '100%', height: Number(config.height || 420), border: 0 }} /> : <p>Configure a map URL or map provider settings.</p>}{children}</Shell>;
  if (componentName === 'RangeSlider') {
    const low = Number(config.lowValue || min || 0);
    const high = Number(config.highValue || max || 100);
    return <Shell title={title}><label>From <input type="range" min={low} max={high} defaultValue={low} /></label><label>To <input type="range" min={low} max={high} defaultValue={high} /></label>{children}</Shell>;
  }
  if (componentName === 'RatingLayout') {
    const rating = Math.max(0, Math.min(5, Number(config.rating || value || 0)));
    return <Shell title={title}><div aria-label={rating + ' out of 5 stars'} style={{ color: '#d18a00', fontSize: 26 }}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>{children}</Shell>;
  }
  if (componentName === 'DynamicTemplate') return <div style={{ display: 'grid', gap: 16 }}>{children}</div>;
  return <div style={{ width: '100%' }}>{children}</div>;
};
