/**
 * React & Next.js Usage Example for @numberslk/icons
 *
 * Install in your project:
 *   npm install @numberslk/icons
 */

import React, { useState } from 'react';

// 1. Direct Tree-Shakeable Icon Imports
import {
  ElephantIcon,
  TelephoneIcon,
  CompassIcon,
  FlowerBudIcon,
  ElectionSymbol,
  searchSymbols,
  getSymbolById
} from '@numberslk/icons';

export function ElectionIconsShowcase() {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('2025-pres-national-NPP');

  const filteredSymbols = query ? searchSymbols(query) : [];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h1>Sri Lanka Election Symbols Demo</h1>

      {/* Featured Icons with Props */}
      <section style={{ marginBottom: 32 }}>
        <h2>1. Individual React Components</h2>
        <p>Icons inherit current color by default or can be customized via props:</p>

        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {/* Default 24px */}
          <div style={{ textAlign: 'center' }}>
            <ElephantIcon size={36} color="#0284c7" />
            <div><small>Elephant (UNP)</small></div>
          </div>

          {/* Sizing & Custom Hex Colors */}
          <div style={{ textAlign: 'center' }}>
            <TelephoneIcon size={36} color="#16a34a" />
            <div><small>Telephone (SJB)</small></div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <CompassIcon size={36} color="#dc2626" />
            <div><small>Compass (NPP)</small></div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <FlowerBudIcon size={36} color="#9333ea" />
            <div><small>Flower Bud (SLPP)</small></div>
          </div>
        </div>
      </section>

      {/* Dynamic Election Context Component */}
      <section style={{ marginBottom: 32 }}>
        <h2>2. Dynamic Election Context Resolver</h2>
        <p>Render symbols dynamically based on political election tags:</p>

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          style={{ padding: '8px 12px', fontSize: 16, marginBottom: 16 }}
        >
          <option value="2025-pres-national-NPP">&lt;lk-election-symbols-2025-pres-national-NPP&gt;</option>
          <option value="2024-pres-national-SJB">&lt;lk-election-symbols-2024-pres-national-SJB&gt;</option>
          <option value="2024-pres-national-SLPP">&lt;lk-election-symbols-2024-pres-national-SLPP&gt;</option>
          <option value="2024-parl-national-UNP">&lt;lk-election-symbols-2024-parl-national-UNP&gt;</option>
          <option value="2024-parl-national-ITAK">&lt;lk-election-symbols-2024-parl-national-ITAK&gt;</option>
          <option value="2024-pres-national-IND16">&lt;lk-election-symbols-2024-pres-national-IND16&gt;</option>
        </select>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: '#f8fafc', borderRadius: 8 }}>
          <ElectionSymbol election={selectedTag} size={48} color="#0f172a" />
          <span>Active Tag: <code>{selectedTag}</code></span>
        </div>
      </section>

      {/* Multilingual Search */}
      <section>
        <h2>3. Multilingual Live Search</h2>
        <input
          type="text"
          placeholder="Search by English, Sinhala (අලියා), Tamil (யானை), or party (UNP)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', fontSize: 16, boxSizing: 'border-box' }}
        />

        {query && (
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {filteredSymbols.slice(0, 8).map((symbol) => (
              <div key={symbol.id} style={{ border: '1px solid #e2e8f0', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                <ElectionSymbol name={symbol.id} size={32} />
                <div style={{ fontWeight: 'bold', marginTop: 8 }}>{symbol.name}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{symbol.nameSi} / {symbol.nameTa}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ElectionIconsShowcase;
