/**
 * Election Symbols Showcase Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const symbols = window.LK_ELECTION_SYMBOLS || [];

  // DOM Elements
  const iconsGrid = document.getElementById('iconsGrid');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterTabs = document.querySelectorAll('.seg-tab');
  const sizeSlider = document.getElementById('sizeSlider');
  const sizeValue = document.getElementById('sizeValue');
  const sizeResetBtn = document.getElementById('sizeResetBtn');
  const sizePillBtns = document.querySelectorAll('.size-pill-btn');
  const focusDots = document.querySelectorAll('.focus-dot');
  const resultsCount = document.getElementById('resultsCount');
  const emptyState = document.getElementById('emptyState');
  const resetSearchBtn = document.getElementById('resetSearchBtn');
  const copyNpmBtn = document.getElementById('copyNpmBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeSunIcon = document.getElementById('themeSunIcon');
  const themeMoonIcon = document.getElementById('themeMoonIcon');
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  // Modal Elements
  const modal = document.getElementById('iconModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalSvgContainer = document.getElementById('modalSvgContainer');
  const modalTitle = document.getElementById('modalTitle');
  const modalCopyNameBtn = document.getElementById('modalCopyNameBtn');
  const modalSinhala = document.getElementById('modalSinhala');
  const modalTamil = document.getElementById('modalTamil');
  const modalBadges = document.getElementById('modalBadges');
  const modalPartiesSection = document.getElementById('modalPartiesSection');
  const modalPartiesList = document.getElementById('modalPartiesList');
  const modalSnippetCode = document.getElementById('modalSnippetCode');
  const snippetTabs = document.querySelectorAll('.code-tab-btn');
  const modalCopyBtn = document.getElementById('modalCopyBtn');
  const modalCopySvgBtn = document.getElementById('modalCopySvgBtn');
  const modalDownloadSvgBtn = document.getElementById('modalDownloadSvgBtn');
  const modalDownloadPngBtn = document.getElementById('modalDownloadPngBtn');
  const previewSizeBtns = document.querySelectorAll('.modal-size-pills .btn-pill');
  const modalSnippetCopyBtn = document.getElementById('modalSnippetCopyBtn');
  const modalStageDimensionText = document.getElementById('modalStageDimensionText');
  const modalCurrentScaleLabel = document.getElementById('modalCurrentScaleLabel');
  const modalElectionBox = document.getElementById('modalElectionBox');
  const modalElectionBadge = document.getElementById('modalElectionBadge');
  const modalElectionTagCode = document.getElementById('modalElectionTagCode');
  const modalCopyElectionTagBtn = document.getElementById('modalCopyElectionTagBtn');

  // State: Standard Icon Sizes (32, 64, 128, 256)
  const STANDARD_SIZES = [
    {
      size: 32,
      cardSize: '104px',
      circleDim: '52px',
      svgDim: '32px',
      slugFontSize: '0.625rem',
      gap: '0.5rem',
      cardPadding: '0.35rem 0.25rem 0.35rem 0.25rem',
    },
    {
      size: 64,
      cardSize: '148px',
      circleDim: '92px',
      svgDim: '64px',
      slugFontSize: '0.6875rem',
      gap: '0.625rem',
      cardPadding: '0.5rem 0.45rem 0.45rem 0.45rem',
    },
    {
      size: 128,
      cardSize: '210px',
      circleDim: '144px',
      svgDim: '108px',
      slugFontSize: '0.75rem',
      gap: '0.75rem',
      cardPadding: '0.625rem 0.5rem 0.5rem 0.5rem',
    },
    {
      size: 256,
      cardSize: '280px',
      circleDim: '200px',
      svgDim: '152px',
      slugFontSize: '0.8125rem',
      gap: '0.875rem',
      cardPadding: '0.75rem 0.625rem 0.625rem 0.625rem',
    }
  ];
  const DEFAULT_SIZE = 64;
  let storedStandardSize = parseInt(localStorage.getItem('lk_icons_standard_size'), 10);
  if (isNaN(storedStandardSize)) {
    const oldCardSize = parseInt(localStorage.getItem('lk_icons_card_size'), 10);
    if (!isNaN(oldCardSize)) {
      if (oldCardSize <= 115) storedStandardSize = 32;
      else if (oldCardSize <= 180) storedStandardSize = 64;
      else if (oldCardSize <= 280) storedStandardSize = 128;
      else storedStandardSize = 256;
    }
  }
  let currentStandardSize = [32, 64, 128, 256].includes(storedStandardSize)
    ? storedStandardSize
    : DEFAULT_SIZE;
  let currentFilter = 'all';
  let searchQuery = '';
  let activeModalSymbol = null;
  let activeSnippetTab = 'react';
  let modalPreviewSize = 128;
  let toastTimeout = null;

  // Initialize Tab & Stat Counts
  const countA = symbols.filter(s => s.schedule === 'A').length;
  const countB = symbols.filter(s => s.schedule === 'B').length;
  const countPop = symbols.filter(s => s.isPopular).length;
  
  const elCountAll = document.getElementById('countAll');
  const elCountA = document.getElementById('countA');
  const elCountB = document.getElementById('countB');
  const elCountPop = document.getElementById('countPop');
  const elSidebarCountAll = document.getElementById('sidebarCountAll');

  if (elCountAll) elCountAll.textContent = symbols.length;
  if (elCountA) elCountA.textContent = countA;
  if (elCountB) elCountB.textContent = countB;
  if (elCountPop) elCountPop.textContent = countPop;
  if (elSidebarCountAll) elSidebarCountAll.textContent = symbols.length;

  // =========================================================================
  // Theme Management (Light / Dark)
  // =========================================================================
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('es-theme', theme);
    } catch (e) {}

    if (theme === 'dark') {
      themeSunIcon.style.display = 'block';
      themeMoonIcon.style.display = 'none';
    } else {
      themeSunIcon.style.display = 'none';
      themeMoonIcon.style.display = 'block';
    }
  }

  // Detect initial theme
  const urlParams = new URLSearchParams(window.location.search);
  let savedTheme = urlParams.get('theme');
  if (!savedTheme) {
    try {
      savedTheme = localStorage.getItem('es-theme');
    } catch (e) {}
  }

  if (!savedTheme) {
    savedTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const curr = document.documentElement.getAttribute('data-theme') || 'light';
    const next = curr === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // =========================================================================
  // Toast & Copy Helpers
  // =========================================================================
  function showToast(message) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastMsg.textContent = message;
    toast.style.display = 'flex';
    toastTimeout = setTimeout(() => {
      toast.style.display = 'none';
    }, 2200);
  }

  function copyText(text, successMsg = 'Copied to clipboard!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(successMsg);
  }

  // Copy NPM Command Button
  copyNpmBtn.addEventListener('click', () => {
    copyText('npm i @numberslk/icons', 'Copied "npm i @numberslk/icons" to clipboard!');
  });

  // =========================================================================
  // Filtering & Search
  // =========================================================================
  function getFilteredSymbols() {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return symbols.filter(s => {
        if (currentFilter === 'schedule-a' && s.schedule !== 'A') return false;
        if (currentFilter === 'schedule-b' && s.schedule !== 'B') return false;
        if (currentFilter === 'popular' && !s.isPopular) return false;
        return true;
      });
    }

    // Attempt resolving election context syntax query (e.g. 2025-pres-national-npp)
    let resolvedId = null;
    if (typeof window.resolveElectionSymbol === 'function') {
      try {
        const resolved = window.resolveElectionSymbol(q);
        if (resolved && resolved.id) {
          resolvedId = resolved.id;
        }
      } catch (e) {}
    }

    return symbols.filter(s => {
      if (currentFilter === 'schedule-a' && s.schedule !== 'A') return false;
      if (currentFilter === 'schedule-b' && s.schedule !== 'B') return false;
      if (currentFilter === 'popular' && !s.isPopular) return false;

      if (resolvedId && s.id === resolvedId) return true;
      if (s.name.toLowerCase().includes(q)) return true;
      if (s.id.toLowerCase().includes(q)) return true;
      if (s.nameSi && s.nameSi.toLowerCase().includes(q)) return true;
      if (s.nameTa && s.nameTa.toLowerCase().includes(q)) return true;
      if (s.primaryElectionTag && s.primaryElectionTag.toLowerCase().includes(q)) return true;
      if (s.electionAliases && s.electionAliases.some(a => a.toLowerCase().includes(q))) return true;
      if (s.tags && s.tags.some(t => t.toLowerCase().includes(q))) return true;
      if (s.parties && s.parties.some(p => p.toLowerCase().includes(q))) return true;
      return false;
    });
  }

  // Render Grid
  function renderGrid() {
    const filtered = getFilteredSymbols();
    iconsGrid.innerHTML = '';

    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} of ${symbols.length} symbols`;
    }

    if (filtered.length === 0) {
      emptyState.style.display = 'block';
      iconsGrid.style.display = 'none';
      return;
    } else {
      emptyState.style.display = 'none';
      iconsGrid.style.display = 'grid';
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach(s => {
      const card = document.createElement('div');
      card.className = 'icon-card';
      card.setAttribute('data-id', s.id);
      card.setAttribute('title', `${s.name} (${s.nameSi || ''}) - Click to inspect`);

      const iconSlug = `lk-election-${s.id}`;

      // Dynamic SVG inside circular insignia frame (scales automatically via --card-size)
      const cardSvg = s.svg.replace('<svg', '<svg class="card-symbol-svg"');

      card.innerHTML = `
        <div class="card-icon-box">
          <button class="card-copy-btn" data-slug="${iconSlug}" title="Copy ${iconSlug}">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy</span>
          </button>
          <div class="symbol-circle-frame">
            ${cardSvg}
          </div>
        </div>
        <div class="card-slug" title="${iconSlug}">${iconSlug}</div>
      `;

      const copyBtn = card.querySelector('.card-copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          copyText(iconSlug, `Copied "${iconSlug}" to clipboard!`);
          const origHtml = copyBtn.innerHTML;
          copyBtn.classList.add('copied');
          copyBtn.innerHTML = `<span>Copied!</span>`;
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = origHtml;
          }, 1500);
        });
      }

      card.addEventListener('click', () => {
        openModal(s);
      });

      fragment.appendChild(card);
    });

    iconsGrid.appendChild(fragment);
  }

  // =========================================================================
  // Modal Handling
  // =========================================================================
  function openModal(symbol) {
    activeModalSymbol = symbol;
    const iconSlug = `lk-election-${symbol.id}`;
    modalTitle.textContent = iconSlug;
    modalSinhala.textContent = `${symbol.name} • ${symbol.nameSi || ''}`;
    modalTamil.textContent = symbol.nameTa || '';

    if (modalStageDimensionText) modalStageDimensionText.textContent = `${modalPreviewSize} × ${modalPreviewSize} px`;
    if (modalCurrentScaleLabel) modalCurrentScaleLabel.textContent = `${modalPreviewSize}px`;

    modalBadges.innerHTML = `
      <span class="badge badge-secondary">
        Schedule ${symbol.schedule} • ${symbol.category}
      </span>
      ${symbol.isPopular ? '<span class="badge badge-primary">Prominent</span>' : ''}
    `;

    if (symbol.parties && symbol.parties.length > 0) {
      modalPartiesSection.style.display = 'block';
      modalPartiesList.innerHTML = symbol.parties.map(p => `
        <span class="party-tag">${p}</span>
      `).join('');
    } else {
      modalPartiesSection.style.display = 'none';
    }

    // Election Context Tag Box
    if (modalElectionBox && modalElectionTagCode) {
      const primaryTag = symbol.primaryElectionTag || `<lk-election-symbols-2024-parl-national-${symbol.id}>`;
      modalElectionTagCode.textContent = primaryTag;
      if (modalElectionBadge) {
        if (symbol.schedule === 'A') {
          modalElectionBadge.textContent = 'Party Insignia Tag';
        } else {
          modalElectionBadge.textContent = 'Independent Group Tag';
        }
      }
    }

    renderModalSvg();
    updateModalSnippet();
    modal.style.display = 'flex';
  }

  function renderModalSvg() {
    if (!activeModalSymbol) return;
    const styledSvg = activeModalSymbol.svg
      .replace(/width="[^"]+"/, `width="${modalPreviewSize}"`)
      .replace(/height="[^"]+"/, `height="${modalPreviewSize}"`);
    modalSvgContainer.innerHTML = styledSvg;
  }

  function updateModalSnippet() {
    if (!activeModalSymbol) return;
    const s = activeModalSymbol;
    let code = '';
    let lang = 'jsx';

    if (activeSnippetTab === 'react') {
      lang = 'jsx';
      code = `// Subpath import (recommended) or root import
import { ${s.componentName} } from '@numberslk/icons/election-symbols';
// import { ${s.componentName} } from '@numberslk/icons';

<${s.componentName} size={${modalPreviewSize}} />`;
    } else if (activeSnippetTab === 'election') {
      lang = 'markup';
      const tag = s.primaryElectionTag || `<lk-election-symbols-2024-parl-national-${s.id}>`;
      const tagClean = tag.replace(/^</, '').replace(/>$/, '');
      code = `<!-- 1. Direct Web Component / Custom Element -->
<${tagClean} size="${modalPreviewSize}"></${tagClean}>

<!-- 2. Generic Web Component with Election Context Query -->
<lk-election-symbol name="${tagClean}" size="${modalPreviewSize}"></lk-election-symbol>

<!-- 3. React Dynamic Component with Election Context -->
import { ElectionSymbol } from '@numberslk/icons/election-symbols';

<ElectionSymbol name="${tagClean}" size={${modalPreviewSize}} />

// 4. JavaScript Resolver API
import { resolveElectionSymbol, getSymbolByElection } from '@numberslk/icons/election-symbols';

const symbol = resolveElectionSymbol('${tagClean}');
console.log(symbol.name, symbol.id); // "${s.name}", "${s.id}"`;
    } else if (activeSnippetTab === 'svg') {
      lang = 'markup';
      code = s.svg;
    } else if (activeSnippetTab === 'vue') {
      lang = 'markup';
      code = `<script setup>
import { ${s.componentName} } from '@numberslk/icons/election-symbols';
</script>

<template>
  <${s.componentName} :size="${modalPreviewSize}" />
</template>`;
    } else if (activeSnippetTab === 'html') {
      lang = 'markup';
      code = `<!-- High-resolution 512px SVG via jsDelivr CDN -->
<img src="https://cdn.jsdelivr.net/npm/@numberslk/icons@1.0.0/dist/svg/${s.id}.svg"
     width="${modalPreviewSize}" height="${modalPreviewSize}"
     alt="${s.name}" />

<!-- Or import inline helper via ESM -->
<script type="module">
  import { getSymbolSvg } from 'https://cdn.jsdelivr.net/npm/@numberslk/icons@1.0.0/+esm';
  document.getElementById('icon').innerHTML = getSymbolSvg('${s.id}', { size: ${modalPreviewSize} });
</script>`;
    }

    modalSnippetCode.className = `language-${lang}`;
    modalSnippetCode.textContent = code;
    modalSnippetCode.dataset.rawCode = code;

    if (window.Prism) {
      Prism.highlightElement(modalSnippetCode);
    }
  }

  // Inline snippet copy button
  if (modalSnippetCopyBtn) {
    modalSnippetCopyBtn.addEventListener('click', () => {
      const textToCopy = (modalSnippetCode.dataset && modalSnippetCode.dataset.rawCode) || modalSnippetCode.textContent;
      if (!textToCopy) return;
      copyText(textToCopy, 'Code snippet copied to clipboard!');
      const origHtml = modalSnippetCopyBtn.innerHTML;
      modalSnippetCopyBtn.classList.add('copied');
      modalSnippetCopyBtn.innerHTML = `<span>Copied!</span>`;
      setTimeout(() => {
        modalSnippetCopyBtn.classList.remove('copied');
        modalSnippetCopyBtn.innerHTML = origHtml;
      }, 1500);
    });
  }

  function closeModal() {
    modal.style.display = 'none';
    activeModalSymbol = null;
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Modal scale preview buttons
  previewSizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      previewSizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      modalPreviewSize = parseInt(btn.dataset.previewSize, 10);
      if (modalStageDimensionText) modalStageDimensionText.textContent = `${modalPreviewSize} × ${modalPreviewSize} px`;
      if (modalCurrentScaleLabel) modalCurrentScaleLabel.textContent = `${modalPreviewSize}px`;
      renderModalSvg();
      updateModalSnippet();
    });
  });

  // Copy Symbol Name in Modal
  if (modalCopyNameBtn) {
    modalCopyNameBtn.addEventListener('click', () => {
      if (!activeModalSymbol) return;
      const slug = `lk-election-${activeModalSymbol.id}`;
      copyText(slug, `Copied "${slug}" to clipboard!`);
      const origHtml = modalCopyNameBtn.innerHTML;
      modalCopyNameBtn.classList.add('copied');
      modalCopyNameBtn.innerHTML = `<span>Copied!</span>`;
      setTimeout(() => {
        modalCopyNameBtn.classList.remove('copied');
        modalCopyNameBtn.innerHTML = origHtml;
      }, 1500);
    });
  }

  // Snippet Tab switching
  snippetTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      snippetTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeSnippetTab = tab.dataset.tab;
      updateModalSnippet();
    });
  });

  // Copy JSX in Modal
  modalCopyBtn.addEventListener('click', () => {
    if (!activeModalSymbol) return;
    const code = `<${activeModalSymbol.componentName} size={${modalPreviewSize}} />`;
    copyText(code, `Copied "<${activeModalSymbol.componentName} />" to clipboard!`);
  });

  // Copy SVG in Modal
  modalCopySvgBtn.addEventListener('click', () => {
    if (!activeModalSymbol) return;
    const iconSlug = `lk-election-${activeModalSymbol.id}`;
    copyText(activeModalSymbol.svg, `Copied "${iconSlug}.svg" to clipboard!`);
  });

  // Copy Election Tag in Modal
  if (modalCopyElectionTagBtn) {
    modalCopyElectionTagBtn.addEventListener('click', () => {
      if (!activeModalSymbol) return;
      const tag = (modalElectionTagCode && modalElectionTagCode.textContent) || activeModalSymbol.primaryElectionTag || `<lk-election-symbols-2024-parl-national-${activeModalSymbol.id}>`;
      copyText(tag, `Copied "${tag}" to clipboard!`);
    });
  }

  // Download SVG
  modalDownloadSvgBtn.addEventListener('click', () => {
    if (!activeModalSymbol) return;
    const iconSlug = `lk-election-${activeModalSymbol.id}`;
    const blob = new Blob([activeModalSymbol.svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${iconSlug}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${iconSlug}.svg`);
  });

  // Download PNG (512x512)
  modalDownloadPngBtn.addEventListener('click', () => {
    if (!activeModalSymbol) return;
    const iconSlug = `lk-election-${activeModalSymbol.id}`;
    const a = document.createElement('a');
    a.href = `png/${activeModalSymbol.id}.png`;
    a.download = `${iconSlug}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Downloaded ${iconSlug}.png (512px)`);
  });

  // =========================================================================
  // Collection View Management (Sidebar Switching)
  // =========================================================================
  const upcomingData = {
    'banks': {
      title: 'Banks & Financial Insignia',
      desc: 'Precision SVG icons of licensed commercial banks and financial institutions of Sri Lanka. Master 512px cubic spline plates are currently in active curation and optical keyline testing.',
      badge: 'Planned for Q1 2025',
      icon: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="3 10 12 4 21 10"></polyline><line x1="6" y1="10" x2="6" y2="21"></line><line x1="10" y1="10" x2="10" y2="21"></line><line x1="14" y1="10" x2="14" y2="21"></line><line x1="18" y1="10" x2="18" y2="21"></line></svg>`
    },
    'gov': {
      title: 'Government & Civic Institutes',
      desc: 'Official civic insignias, departmental emblems, and statutory authority crests of Sri Lanka. Built with strict optical keylines and circular clearance for digital portals and citizen service apps.',
      badge: 'Planned for Q1 2025',
      icon: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="2" width="16" height="20" rx="2"></rect><path d="M9 22v-4h6v4"></path><line x1="8" y1="6" x2="8.01" y2="6"></line><line x1="16" y1="6" x2="16.01" y2="6"></line><line x1="12" y1="6" x2="12.01" y2="6"></line></svg>`
    },
    'brands': {
      title: 'Iconic Sri Lankan Brands',
      desc: 'Vector symbols and logos of iconic household Sri Lankan brands across telecommunications, aviation, retail, and FMCG. Precision SVG formats optimized for modern web applications.',
      badge: 'Planned for Q2 2025',
      icon: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2H2v10l9.29 9.29a2 2 0 0 0 2.83 0l6.59-6.59a2 2 0 0 0 0-2.83L12 2Z"></path><circle cx="7" cy="7" r="1.5"></circle></svg>`
    },
    'seals': {
      title: 'Provincial & Municipal Seals',
      desc: 'Official provincial council emblems and municipal seals for the 9 provinces and 24 administrative districts of Sri Lanka.',
      badge: 'Planned for Q2 2025',
      icon: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
    }
  };

  const viewElection = document.getElementById('viewElectionSymbols');
  const viewDocs = document.getElementById('viewDocs');
  const viewUpcoming = document.getElementById('viewUpcoming');
  const viewConfig = document.getElementById('viewConfig');
  const upcomingTitle = document.getElementById('upcomingTitle');
  const upcomingDesc = document.getElementById('upcomingDesc');
  const upcomingBadge = document.getElementById('upcomingBadge');
  const upcomingIcon = document.getElementById('upcomingIcon');

  const navItems = document.querySelectorAll('.sidebar-nav-item[data-view], .inline-nav-tab[data-view], .sidebar-menu-button[data-view]');
  const backToElectionBtns = document.querySelectorAll('.back-to-election-btn');
  const openDocsBtns = document.querySelectorAll('.open-docs-view-btn');
  const brandHomeLink = document.getElementById('brandHomeLink');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const appSidebar = document.getElementById('appSidebar');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  function switchView(viewKey) {
    if (viewKey === 'election-symbols') {
      if (viewElection) viewElection.style.display = 'block';
      if (viewDocs) viewDocs.style.display = 'none';
      if (viewUpcoming) viewUpcoming.style.display = 'none';
      if (viewConfig) viewConfig.style.display = 'none';
    } else if (viewKey === 'docs') {
      if (viewElection) viewElection.style.display = 'none';
      if (viewDocs) viewDocs.style.display = 'block';
      if (viewUpcoming) viewUpcoming.style.display = 'none';
      if (viewConfig) viewConfig.style.display = 'none';
      if (window.Prism) {
        Prism.highlightAll();
      }
    } else if (viewKey === 'config') {
      if (viewElection) viewElection.style.display = 'none';
      if (viewDocs) viewDocs.style.display = 'none';
      if (viewUpcoming) viewUpcoming.style.display = 'none';
      if (viewConfig) viewConfig.style.display = 'block';
      initMapConfigurator();
    } else if (upcomingData[viewKey]) {
      const data = upcomingData[viewKey];
      if (upcomingTitle) upcomingTitle.textContent = data.title;
      if (upcomingDesc) upcomingDesc.textContent = data.desc;
      if (upcomingBadge) upcomingBadge.textContent = data.badge;
      if (upcomingIcon) upcomingIcon.innerHTML = data.icon;
      if (viewElection) viewElection.style.display = 'none';
      if (viewDocs) viewDocs.style.display = 'none';
      if (viewUpcoming) viewUpcoming.style.display = 'block';
      if (viewConfig) viewConfig.style.display = 'none';
    }

    navItems.forEach(item => {
      const isMatch = item.dataset.view === viewKey;
      item.classList.toggle('active', isMatch);
    });

    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // Election Map Configurator Module
  // =========================================================================
  let configState = {
    aliases: Object.assign({}, window.LK_ELECTION_ALIASES || {}),
    partyMap: Object.assign({}, window.LK_ELECTION_PARTY_MAP || {}),
    districts: window.LK_ELECTION_DISTRICTS || [
      "national", "colombo", "gampaha", "kalutara", "kandy", "matale", "nuwara-eliya",
      "galle", "matara", "hambantota", "jaffna", "vanni", "batticaloa", "digamadulla",
      "ampara", "trincomalee", "kurunegala", "puttalam", "anuradhapura", "polonnaruwa",
      "badulla", "monaragala", "ratnapura", "kegalle"
    ],
    independentScheduleBSymbols: window.LK_ELECTION_INDEPENDENT_SYMBOLS || []
  };

  let configuratorInitialized = false;
  let activeConfigTab = 'aliases';

  // Config DOM Elements
  const configAddBtn = document.getElementById('configAddBtn');
  const configSaveBtn = document.getElementById('configSaveBtn');
  const configDownloadBtn = document.getElementById('configDownloadBtn');
  const configCopyJsonBtn = document.getElementById('configCopyJsonBtn');
  const configResetBtn = document.getElementById('configResetBtn');

  const tabBtnAliases = document.getElementById('tabBtnAliases');
  const tabBtnParties = document.getElementById('tabBtnParties');
  const tabBtnJson = document.getElementById('tabBtnJson');
  const paneAliases = document.getElementById('paneAliases');
  const paneParties = document.getElementById('paneParties');
  const paneJson = document.getElementById('paneJson');

  const configSearchInput = document.getElementById('configSearchInput');
  const configFilterYear = document.getElementById('configFilterYear');
  const configFilterType = document.getElementById('configFilterType');
  const configFilterDistrict = document.getElementById('configFilterDistrict');
  const configAliasesTableBody = document.getElementById('configAliasesTableBody');
  const configPartiesTableBody = document.getElementById('configPartiesTableBody');
  const configTableFooter = document.getElementById('configTableFooter');
  const configJsonTextarea = document.getElementById('configJsonTextarea');
  const configFormatJsonBtn = document.getElementById('configFormatJsonBtn');
  const configApplyJsonBtn = document.getElementById('configApplyJsonBtn');

  const configMetricAliases = document.getElementById('configMetricAliases');
  const configMetricParties = document.getElementById('configMetricParties');
  const configMetricDistricts = document.getElementById('configMetricDistricts');
  const configStatusDot = document.getElementById('configStatusDot');
  const configStatusText = document.getElementById('configStatusText');
  const tabBadgeAliasesCount = document.getElementById('tabBadgeAliasesCount');
  const tabBadgePartiesCount = document.getElementById('tabBadgePartiesCount');
  const sidebarCountConfig = document.getElementById('sidebarCountConfig');

  // Modal DOM Elements
  const configModal = document.getElementById('configModal');
  const configModalCloseBtn = document.getElementById('configModalCloseBtn');
  const configModalCancelBtn = document.getElementById('configModalCancelBtn');
  const configModalSaveBtn = document.getElementById('configModalSaveBtn');
  const configModalTitle = document.getElementById('configModalTitle');
  const configFormOriginalKey = document.getElementById('configFormOriginalKey');
  const formYear = document.getElementById('formYear');
  const formType = document.getElementById('formType');
  const formDistrict = document.getElementById('formDistrict');
  const formParty = document.getElementById('formParty');
  const formSymbolSelect = document.getElementById('formSymbolSelect');
  const formPreviewTag = document.getElementById('formPreviewTag');
  const formPreviewAvatar = document.getElementById('formPreviewAvatar');
  const formPreviewTitle = document.getElementById('formPreviewTitle');
  const formPreviewSub = document.getElementById('formPreviewSub');

  function initMapConfigurator() {
    if (!configuratorInitialized) {
      setupConfiguratorEvents();
      populateConfigSelects();
      configuratorInitialized = true;
    }
    updateConfigMetrics();
    renderConfigAliasesTable();
    renderConfigPartiesTable();
    updateConfigJsonTextarea();
  }

  function setupConfiguratorEvents() {
    // Toolbar buttons
    if (configAddBtn) configAddBtn.addEventListener('click', () => openConfigModal(null));
    if (configSaveBtn) configSaveBtn.addEventListener('click', () => saveConfigToApplicationFile(true));
    if (configDownloadBtn) configDownloadBtn.addEventListener('click', downloadConfigFile);
    if (configCopyJsonBtn) configCopyJsonBtn.addEventListener('click', copyConfigJson);
    if (configResetBtn) configResetBtn.addEventListener('click', resetConfigToDefaults);

    // Subtabs switching
    if (tabBtnAliases) tabBtnAliases.addEventListener('click', () => switchConfigTab('aliases'));
    if (tabBtnParties) tabBtnParties.addEventListener('click', () => switchConfigTab('parties'));
    if (tabBtnJson) tabBtnJson.addEventListener('click', () => switchConfigTab('json'));

    // Filters
    if (configSearchInput) configSearchInput.addEventListener('input', renderConfigAliasesTable);
    if (configFilterYear) configFilterYear.addEventListener('change', renderConfigAliasesTable);
    if (configFilterType) configFilterType.addEventListener('change', renderConfigAliasesTable);
    if (configFilterDistrict) configFilterDistrict.addEventListener('change', renderConfigAliasesTable);

    // JSON editor buttons
    if (configFormatJsonBtn) {
      configFormatJsonBtn.addEventListener('click', () => {
        try {
          const parsed = JSON.parse(configJsonTextarea.value);
          configJsonTextarea.value = JSON.stringify(parsed, null, 2);
          showToast('JSON formatted successfully.');
        } catch (e) {
          showToast('JSON Syntax Error: ' + e.message);
        }
      });
    }

    if (configApplyJsonBtn) {
      configApplyJsonBtn.addEventListener('click', () => {
        try {
          const parsed = JSON.parse(configJsonTextarea.value);
          if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON root object.');
          if (parsed.aliases) configState.aliases = Object.assign({}, parsed.aliases);
          if (parsed.partyMap) configState.partyMap = Object.assign({}, parsed.partyMap);
          if (parsed.districts) configState.districts = parsed.districts;
          if (parsed.independentScheduleBSymbols) configState.independentScheduleBSymbols = parsed.independentScheduleBSymbols;

          saveConfigToApplicationFile(false);
          updateConfigMetrics();
          renderConfigAliasesTable();
          renderConfigPartiesTable();
          showToast('Applied JSON configuration and saved to application file!');
        } catch (e) {
          showToast('JSON Apply Failed: ' + e.message);
        }
      });
    }

    // Modal controls
    if (configModalCloseBtn) configModalCloseBtn.addEventListener('click', closeConfigModal);
    if (configModalCancelBtn) configModalCancelBtn.addEventListener('click', closeConfigModal);
    if (configModalSaveBtn) configModalSaveBtn.addEventListener('click', handleSaveMappingFromModal);
    if (configModal) {
      configModal.addEventListener('click', (e) => {
        if (e.target === configModal) closeConfigModal();
      });
    }

    // Live modal form updates
    [formYear, formType, formDistrict, formParty, formSymbolSelect].forEach(input => {
      if (input) {
        input.addEventListener('input', updateConfigModalLivePreview);
        input.addEventListener('change', updateConfigModalLivePreview);
      }
    });

    // Quick pills in modal
    document.querySelectorAll('[data-fill-year]').forEach(pill => {
      pill.addEventListener('click', () => {
        if (formYear) {
          formYear.value = pill.dataset.fillYear;
          updateConfigModalLivePreview();
        }
      });
    });

    document.querySelectorAll('[data-fill-party]').forEach(pill => {
      pill.addEventListener('click', () => {
        if (formParty) {
          formParty.value = pill.dataset.fillParty;
          updateConfigModalLivePreview();
        }
      });
    });
  }

  function switchConfigTab(tabKey) {
    activeConfigTab = tabKey;
    if (tabBtnAliases) tabBtnAliases.classList.toggle('active', tabKey === 'aliases');
    if (tabBtnParties) tabBtnParties.classList.toggle('active', tabKey === 'parties');
    if (tabBtnJson) tabBtnJson.classList.toggle('active', tabKey === 'json');

    if (paneAliases) paneAliases.style.display = tabKey === 'aliases' ? 'block' : 'none';
    if (paneParties) paneParties.style.display = tabKey === 'parties' ? 'block' : 'none';
    if (paneJson) {
      paneJson.style.display = tabKey === 'json' ? 'block' : 'none';
      if (tabKey === 'json') updateConfigJsonTextarea();
    }
  }

  function populateConfigSelects() {
    // Populate formSymbolSelect
    if (formSymbolSelect) {
      formSymbolSelect.innerHTML = symbols.map(s => `
        <option value="${s.id}">${s.name} (${s.nameSi || ''} • ${s.id})</option>
      `).join('');
    }

    // Populate Year filter with unique years from aliases
    if (configFilterYear) {
      const years = new Set();
      Object.keys(configState.aliases).forEach(key => {
        const parts = key.split('-');
        if (parts[0] && !isNaN(parts[0])) years.add(parts[0]);
      });
      const sortedYears = Array.from(years).sort((a, b) => b - a);
      configFilterYear.innerHTML = '<option value="all">All Years</option>' +
        sortedYears.map(y => `<option value="${y}">${y}</option>`).join('');
    }

    // Populate District filter
    if (configFilterDistrict) {
      const districts = configState.districts || [];
      configFilterDistrict.innerHTML = '<option value="all">All Scopes / Districts</option>' +
        districts.map(d => `<option value="${d}">${d === 'national' ? 'National Scope' : d.charAt(0).toUpperCase() + d.slice(1)}</option>`).join('');
    }
  }

    function updateConfigMetrics(savedToFile = false) {
    const aliasCount = Object.keys(configState.aliases).length;
    const partyCount = Object.keys(configState.partyMap).length;
    const districtCount = (configState.districts || []).length;

    if (configMetricAliases) configMetricAliases.textContent = aliasCount;
    if (configMetricParties) configMetricParties.textContent = partyCount;
    if (configMetricDistricts) configMetricDistricts.textContent = districtCount;
    if (tabBadgeAliasesCount) tabBadgeAliasesCount.textContent = aliasCount;
    if (tabBadgePartiesCount) tabBadgePartiesCount.textContent = partyCount;
    if (sidebarCountConfig) sidebarCountConfig.textContent = `${aliasCount}`;

    const isCustom = typeof localStorage !== 'undefined' && localStorage.getItem('lk_election_config_custom') !== null;
    if (configStatusDot) {
      configStatusDot.className = 'status-indicator-dot ' + (isCustom || savedToFile ? 'custom' : '');
    }
    if (configStatusText) {
      if (savedToFile) {
        configStatusText.textContent = 'Saved in Application File (src/elections.json)';
      } else if (isCustom) {
        configStatusText.textContent = 'Customized in Application';
      } else {
        configStatusText.textContent = 'Official Gazette Defaults';
      }
    }
  }

  function parseAliasKey(key) {
    const parts = key.split('-');
    const year = parts[0] || '—';
    const type = parts[1] || '—';
    const district = parts[2] || '—';
    const party = parts.slice(3).join('-') || '—';
    return { year, type, district, party, key };
  }

  function renderConfigAliasesTable() {
    if (!configAliasesTableBody) return;
    const query = (configSearchInput ? configSearchInput.value : '').trim().toLowerCase();
    const selYear = configFilterYear ? configFilterYear.value : 'all';
    const selType = configFilterType ? configFilterType.value : 'all';
    const selDistrict = configFilterDistrict ? configFilterDistrict.value : 'all';

    const entries = Object.entries(configState.aliases);
    const filtered = entries.filter(([key, symbolId]) => {
      const parsed = parseAliasKey(key);
      if (selYear !== 'all' && parsed.year !== selYear) return false;
      if (selType !== 'all' && parsed.type !== selType) return false;
      if (selDistrict !== 'all' && parsed.district !== selDistrict) return false;

      if (!query) return true;
      if (key.toLowerCase().includes(query)) return true;
      if (symbolId.toLowerCase().includes(query)) return true;
      if (parsed.party.toLowerCase().includes(query)) return true;
      if (parsed.district.toLowerCase().includes(query)) return true;
      const s = symbols.find(item => item.id === symbolId);
      if (s && s.name.toLowerCase().includes(query)) return true;
      return false;
    });

    if (filtered.length === 0) {
      configAliasesTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding: 2.5rem 1rem; color:var(--muted-foreground);">
            No election mappings match your current filter. Click "Add New Mapping" to configure one.
          </td>
        </tr>
      `;
      if (configTableFooter) configTableFooter.textContent = `Showing 0 of ${entries.length} mappings`;
      return;
    }

    configAliasesTableBody.innerHTML = filtered.map(([key, symbolId]) => {
      const parsed = parseAliasKey(key);
      const sym = symbols.find(s => s.id === symbolId);
      const tagClean = `<lk-election-symbols-${key}>`;
      const svgThumb = sym ? sym.svg.replace(/width="[^"]+"/, 'width="24"').replace(/height="[^"]+"/, 'height="24"') : '';
      const typeLabel = parsed.type === 'pres' ? 'Presidential' : parsed.type === 'parl' ? 'Parliamentary' : parsed.type;
      const distLabel = parsed.district === 'national' ? 'National Scope' : parsed.district.charAt(0).toUpperCase() + parsed.district.slice(1);

      return `
        <tr>
          <td class="config-tag-cell"><code>${tagClean}</code></td>
          <td><span class="badge badge-secondary">${parsed.year}</span></td>
          <td><span style="font-size:0.75rem; color:var(--muted-foreground);">${typeLabel}</span></td>
          <td><span>${distLabel}</span></td>
          <td><span class="party-tag">${parsed.party.toUpperCase()}</span></td>
          <td>
            <div class="config-symbol-cell">
              <div class="config-symbol-thumb circular-masked">${svgThumb}</div>
              <div>
                <div class="config-symbol-name">${sym ? sym.name : symbolId}</div>
                <div class="config-symbol-id">${symbolId}</div>
              </div>
            </div>
          </td>
          <td class="config-actions-cell">
            <button class="btn btn-outline btn-copy-alias-tag" data-tag="${tagClean}">Copy</button>
            <button class="btn btn-outline btn-edit-alias" data-key="${key}">Edit</button>
            <button class="btn btn-ghost btn-delete-alias" data-key="${key}" style="color:#ef4444;" title="Delete">✕</button>
          </td>
        </tr>
      `;
    }).join('');

    if (configTableFooter) {
      configTableFooter.textContent = `Showing ${filtered.length} of ${entries.length} mappings`;
    }

    // Attach row button events
    configAliasesTableBody.querySelectorAll('.btn-copy-alias-tag').forEach(btn => {
      btn.addEventListener('click', () => {
        copyText(btn.dataset.tag, `Copied "${btn.dataset.tag}" to clipboard!`);
      });
    });

    configAliasesTableBody.querySelectorAll('.btn-edit-alias').forEach(btn => {
      btn.addEventListener('click', () => {
        openConfigModal(btn.dataset.key);
      });
    });

    configAliasesTableBody.querySelectorAll('.btn-delete-alias').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (confirm(`Delete election mapping "<lk-election-symbols-${key}>"?`)) {
          delete configState.aliases[key];
          renderConfigAliasesTable();
          updateConfigMetrics();
          updateConfigJsonTextarea();
          saveConfigToApplicationFile(false);
          showToast(`Deleted mapping "<lk-election-symbols-${key}>"`);
        }
      });
    });
  }

  function renderConfigPartiesTable() {
    if (!configPartiesTableBody) return;
    const entries = Object.entries(configState.partyMap);

    configPartiesTableBody.innerHTML = entries.map(([party, symbolId]) => {
      const sym = symbols.find(s => s.id === symbolId);
      const svgThumb = sym ? sym.svg.replace(/width="[^"]+"/, 'width="24"').replace(/height="[^"]+"/, 'height="24"') : '';

      return `
        <tr>
          <td><span class="party-tag" style="font-weight:700; font-size:0.875rem;">${party.toUpperCase()}</span></td>
          <td>
            <div class="config-symbol-cell">
              <div class="config-symbol-thumb circular-masked">${svgThumb}</div>
              <div>
                <div class="config-symbol-name">${sym ? sym.name : symbolId}</div>
                <div class="config-symbol-id">${sym ? `${sym.nameSi || ''} • ${sym.nameTa || ''}` : ''}</div>
              </div>
            </div>
          </td>
          <td><code>${symbolId}</code></td>
          <td class="config-actions-cell">
            <button class="btn btn-outline btn-edit-party" data-party="${party}">Change Symbol</button>
          </td>
        </tr>
      `;
    }).join('');

    configPartiesTableBody.querySelectorAll('.btn-edit-party').forEach(btn => {
      btn.addEventListener('click', () => {
        const party = btn.dataset.party;
        const currentSymbol = configState.partyMap[party];
        const newSymbol = prompt(`Enter Symbol ID for party ${party.toUpperCase()}:`, currentSymbol);
        if (newSymbol && newSymbol.trim()) {
          const cleanId = newSymbol.trim().toLowerCase();
          if (symbols.some(s => s.id === cleanId)) {
            configState.partyMap[party] = cleanId;
            renderConfigPartiesTable();
            updateConfigMetrics();
            updateConfigJsonTextarea();
            saveConfigToApplicationFile(false);
            showToast(`Updated ${party.toUpperCase()} to "${cleanId}"`);
          } else {
            alert(`Symbol ID "${cleanId}" not found in the 182 official symbols.`);
          }
        }
      });
    });
  }

  function updateConfigJsonTextarea() {
    if (!configJsonTextarea) return;
    configJsonTextarea.value = JSON.stringify({
      partyMap: configState.partyMap,
      districts: configState.districts,
      independentScheduleBSymbols: configState.independentScheduleBSymbols,
      aliases: configState.aliases
    }, null, 2);
  }

  function openConfigModal(aliasKey = null) {
    if (!configModal) return;
    if (aliasKey) {
      configModalTitle.textContent = 'Edit Election Mapping';
      configFormOriginalKey.value = aliasKey;
      const parsed = parseAliasKey(aliasKey);
      if (formYear) formYear.value = parsed.year;
      if (formType) formType.value = parsed.type;
      if (formDistrict) formDistrict.value = parsed.district;
      if (formParty) formParty.value = parsed.party.toUpperCase();
      if (formSymbolSelect) formSymbolSelect.value = configState.aliases[aliasKey] || 'compass';
    } else {
      configModalTitle.textContent = 'Add Election Mapping';
      configFormOriginalKey.value = '';
      if (formYear) formYear.value = '2025';
      if (formType) formType.value = 'pres';
      if (formDistrict) formDistrict.value = 'national';
      if (formParty) formParty.value = 'NPP';
      if (formSymbolSelect) formSymbolSelect.value = 'compass';
    }

    updateConfigModalLivePreview();
    configModal.style.display = 'flex';
  }

  function closeConfigModal() {
    if (configModal) configModal.style.display = 'none';
  }

  function updateConfigModalLivePreview() {
    const year = formYear ? formYear.value.trim() : '2025';
    const type = formType ? formType.value.trim() : 'pres';
    const district = formDistrict ? formDistrict.value.trim() : 'national';
    const party = formParty ? formParty.value.trim() : 'NPP';
    const symbolId = formSymbolSelect ? formSymbolSelect.value : 'compass';

    const generatedTag = `<lk-election-symbols-${year}-${type}-${district}-${party.toUpperCase()}>`;
    if (formPreviewTag) formPreviewTag.textContent = generatedTag;

    const sym = symbols.find(s => s.id === symbolId);
    if (sym && formPreviewAvatar) {
      formPreviewAvatar.innerHTML = sym.svg
        .replace(/width="[^"]+"/, 'width="48"')
        .replace(/height="[^"]+"/, 'height="48"');
      if (formPreviewTitle) formPreviewTitle.textContent = sym.name;
      if (formPreviewSub) formPreviewSub.textContent = `${sym.nameSi || ''} • ${sym.nameTa || ''}`;
    }
  }

  function handleSaveMappingFromModal() {
    const year = formYear ? formYear.value.trim() : '';
    const type = formType ? formType.value.trim() : '';
    const district = formDistrict ? formDistrict.value.trim() : '';
    const party = formParty ? formParty.value.trim() : '';
    const symbolId = formSymbolSelect ? formSymbolSelect.value : '';
    const origKey = configFormOriginalKey ? configFormOriginalKey.value.trim() : '';

    if (!year || !party || !symbolId) {
      showToast('Please fill out all required fields.');
      return;
    }

    const cleanParty = party.toLowerCase();
    const newKey = `${year}-${type}-${district}-${cleanParty}`;

    if (origKey && origKey !== newKey) {
      delete configState.aliases[origKey];
    }
    configState.aliases[newKey] = symbolId;

    closeConfigModal();
    renderConfigAliasesTable();
    updateConfigMetrics();
    updateConfigJsonTextarea();
    saveConfigToApplicationFile(false);
    showToast(`Saved mapping: <lk-election-symbols-${newKey}>`);
  }

  async function saveConfigToApplicationFile(showFeedback = true) {
    const payload = {
      partyMap: configState.partyMap,
      districts: configState.districts,
      independentScheduleBSymbols: configState.independentScheduleBSymbols,
      aliases: configState.aliases
    };

    let savedToFile = false;

    // 1. Attempt saving directly to application file (src/elections.json) via dev server API
    try {
      const res = await fetch('/api/save-elections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const jsonRes = await res.json();
        if (jsonRes.success) {
          savedToFile = true;
          console.log('✅ Saved directly to application file:', jsonRes);
        }
      }
    } catch (e) {
      // Dev server not reachable (e.g. running from static host or file://)
    }

    // 2. Also persist to localStorage for instant client reload
    try {
      localStorage.setItem('lk_election_config_custom', JSON.stringify(payload));
    } catch (e) {}

    window.LK_ELECTION_ALIASES = Object.assign({}, configState.aliases);
    window.LK_ELECTION_PARTY_MAP = Object.assign({}, configState.partyMap);

    // Register newly added tags as Custom Elements
    if (typeof customElements !== 'undefined') {
      Object.keys(configState.aliases).forEach(key => {
        const tagName = 'lk-election-symbols-' + key.toLowerCase();
        if (!customElements.get(tagName)) {
          try {
            customElements.define(tagName, class extends HTMLElement {
              connectedCallback() {
                const s = window.resolveElectionSymbol ? window.resolveElectionSymbol(key) : null;
                if (s && s.svg) {
                  const sz = this.getAttribute('size') || 64;
                  this.innerHTML = s.svg
                    .replace(/width="[^"]+"/, `width="${sz}"`)
                    .replace(/height="[^"]+"/, `height="${sz}"`);
                }
              }
            });
          } catch (e) {}
        }
      });
    }

    updateConfigMetrics(savedToFile);
    renderGrid();

    if (showFeedback) {
      if (savedToFile) {
        showToast('Saved directly to src/elections.json in application!');
      } else {
        showToast('Saved to application cache! (Run "npm start" to auto-sync to file)');
      }
    }
  }

  function downloadConfigFile() {
    const jsonPayload = JSON.stringify({
      partyMap: configState.partyMap,
      districts: configState.districts,
      independentScheduleBSymbols: configState.independentScheduleBSymbols,
      aliases: configState.aliases
    }, null, 2);

    const blob = new Blob([jsonPayload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elections.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded elections.json');
  }

  function copyConfigJson() {
    const jsonPayload = JSON.stringify({
      partyMap: configState.partyMap,
      districts: configState.districts,
      independentScheduleBSymbols: configState.independentScheduleBSymbols,
      aliases: configState.aliases
    }, null, 2);
    copyText(jsonPayload, 'Copied elections.json to clipboard!');
  }

  function resetConfigToDefaults() {
    if (!confirm('Are you sure you want to reset all custom election mappings to official gazette defaults?')) {
      return;
    }
    try {
      localStorage.removeItem('lk_election_config_custom');
    } catch (e) {}

    configState.aliases = Object.assign({}, window.LK_FACTORY_ELECTION_ALIASES || {});
    configState.partyMap = Object.assign({}, window.LK_FACTORY_ELECTION_PARTY_MAP || {});
    window.LK_ELECTION_ALIASES = Object.assign({}, configState.aliases);
    window.LK_ELECTION_PARTY_MAP = Object.assign({}, configState.partyMap);

    renderConfigAliasesTable();
    renderConfigPartiesTable();
    updateConfigMetrics();
    updateConfigJsonTextarea();
    renderGrid();
    showToast('Reverted to official gazette defaults.');
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      switchView(item.dataset.view);
    });
  });

  backToElectionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchView('election-symbols');
    });
  });

  openDocsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchView('docs');
    });
  });

  if (brandHomeLink) {
    brandHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('election-symbols');
    });
  }

  // Mobile sidebar drawer
  function openMobileSidebar() {
    if (appSidebar) appSidebar.classList.add('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
  }

  function closeMobileSidebar() {
    if (appSidebar) appSidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }

  // =========================================================================
  // Filter Tabs Event Listeners
  // =========================================================================
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderGrid();
    });
  });



  // =========================================================================
  // Standard Size Focus Points (32, 64, 128, 256, 512) & Dynamic Card Scaling
  // =========================================================================
  function applyStandardSize(size, persist = true) {
    const targetSize = parseInt(size, 10);
    const configIndex = STANDARD_SIZES.findIndex(c => c.size === targetSize);
    const activeIndex = configIndex >= 0 ? configIndex : 1;
    const config = STANDARD_SIZES[activeIndex];
    currentStandardSize = config.size;

    if (iconsGrid) {
      iconsGrid.setAttribute('data-size', currentStandardSize);
      iconsGrid.style.setProperty('--card-size', config.cardSize);
      iconsGrid.style.setProperty('--circle-dim', config.circleDim);
      iconsGrid.style.setProperty('--svg-dim', config.svgDim);
      iconsGrid.style.setProperty('--slug-font-size', config.slugFontSize);
      iconsGrid.style.setProperty('--grid-gap', config.gap);
      iconsGrid.style.setProperty('--card-padding', config.cardPadding);
    }

    if (sizeSlider) {
      sizeSlider.value = activeIndex;
    }

    if (sizeValue) {
      sizeValue.textContent = `${currentStandardSize}px`;
    }

    sizePillBtns.forEach(btn => {
      const btnSize = parseInt(btn.dataset.size, 10);
      btn.classList.toggle('active', btnSize === currentStandardSize);
    });

    focusDots.forEach(dot => {
      const dotStep = parseInt(dot.dataset.step, 10);
      dot.classList.toggle('active', dotStep === activeIndex);
    });

    if (sizeResetBtn) {
      const isDefault = currentStandardSize === DEFAULT_SIZE;
      sizeResetBtn.title = isDefault
        ? 'Default standard size (64px)'
        : `Current: ${currentStandardSize}px — Click to reset to default (64px)`;
      sizeResetBtn.classList.toggle('is-custom', !isDefault);
    }

    if (persist) {
      try {
        localStorage.setItem('lk_icons_standard_size', currentStandardSize);
      } catch (_) {}
    }
  }

  // Initial apply of standard size
  applyStandardSize(currentStandardSize, false);

  if (sizeSlider) {
    sizeSlider.addEventListener('input', (e) => {
      const idx = parseInt(e.target.value, 10);
      const chosen = STANDARD_SIZES[idx] ? STANDARD_SIZES[idx].size : DEFAULT_SIZE;
      applyStandardSize(chosen, true);
    });
  }

  sizePillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const size = parseInt(btn.dataset.size, 10);
      applyStandardSize(size, true);
    });
  });

  if (sizeResetBtn) {
    sizeResetBtn.addEventListener('click', () => {
      applyStandardSize(DEFAULT_SIZE, true);
    });
  }

  // =========================================================================
  // Search Input Event Listener
  // =========================================================================
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    renderGrid();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    renderGrid();
  });

  resetSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    currentFilter = 'all';
    filterTabs.forEach(t => t.classList.toggle('active', t.dataset.filter === 'all'));
    subLinks.forEach(l => l.classList.toggle('active', l.dataset.subfilter === 'all'));
    renderGrid();
  });

  // Keyboard shortcut '/' to search and Escape to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput && modal.style.display !== 'flex') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    if (e.key === 'Escape') {
      if (modal.style.display === 'flex') {
        closeModal();
      } else if (searchInput.value) {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        renderGrid();
      }
    }
  });

  // Documentation code copy buttons
  document.querySelectorAll('.copy-doc-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      const text = targetEl.textContent.trim();
      copyText(text, 'Code snippet copied to clipboard!');
      const origHtml = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = `<span>Copied!</span>`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = origHtml;
      }, 1500);
    });
  });

  // Initial render
  updateConfigMetrics();
  renderGrid();

  // Trigger Prism syntax highlighting for static doc blocks
  if (window.Prism) {
    Prism.highlightAll();
  }
});
