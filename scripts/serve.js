#!/usr/bin/env node
/**
 * scripts/serve.js
 * 
 * Lightweight local development server with zero dependencies.
 * Serves the showcase application and provides a live API endpoint
 * to save election configuration directly to `src/elections.json`
 * and automatically re-build the package and showcase data.
 * 
 * Usage:
 *   npm start
 *   npm run dev
 *   node scripts/serve.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = process.env.PORT || 3456;
const ROOT_DIR = path.join(__dirname, '..');
const SHOWCASE_DIR = path.join(ROOT_DIR, 'showcase');
const ELECTIONS_FILE = path.join(ROOT_DIR, 'src', 'elections.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API: Save election configuration directly to file in application
  if (req.method === 'POST' && pathname === '/api/save-elections') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);

        if (!payload || typeof payload !== 'object') {
          throw new Error('Invalid JSON payload received.');
        }

        if (!payload.aliases || typeof payload.aliases !== 'object') {
          throw new Error('Missing "aliases" mapping object in configuration.');
        }
        if (!payload.partyMap || typeof payload.partyMap !== 'object') {
          throw new Error('Missing "partyMap" object in configuration.');
        }

        // Format and save directly to src/elections.json
        const formatted = JSON.stringify(payload, null, 2) + '\n';
        fs.writeFileSync(ELECTIONS_FILE, formatted, 'utf-8');
        console.log(`\n💾 [API] Saved updated election map to: ${ELECTIONS_FILE}`);
        console.log(`   - Context Aliases: ${Object.keys(payload.aliases).length}`);
        console.log(`   - Parties: ${Object.keys(payload.partyMap).length}`);

        // Rebuild package and showcase data synchronously
        console.log('🔄 [API] Rebuilding package and showcase data...');
        execSync('node scripts/build_package.js && node scripts/build_showcase_data.js', {
          cwd: ROOT_DIR,
          stdio: 'pipe'
        });
        console.log('✅ [API] Rebuild complete! Showcase and package updated.');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Saved directly to src/elections.json and rebuilt package successfully!',
          filePath: 'src/elections.json',
          aliasesCount: Object.keys(payload.aliases).length,
          partiesCount: Object.keys(payload.partyMap).length,
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        console.error('❌ [API Error]', err.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: err.message
        }));
      }
    });
    return;
  }

  // API: Get current election configuration from file
  if (req.method === 'GET' && pathname === '/api/elections') {
    try {
      const data = fs.readFileSync(ELECTIONS_FILE, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Static File Serving
  let relativeFilePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  let filePath = path.join(SHOWCASE_DIR, relativeFilePath);

  // Check if file is requested from dist (png, svg, etc.)
  if (!fs.existsSync(filePath)) {
    const distPath = path.join(ROOT_DIR, 'dist', relativeFilePath);
    if (fs.existsSync(distPath)) {
      filePath = distPath;
    }
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(SHOWCASE_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'max-age=3600'
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🏛️  Sri Lanka Election Symbols Showcase & Configurator`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`📁 Application file target: src/elections.json`);
  console.log(`⚡ API Save Endpoint: POST http://localhost:${PORT}/api/save-elections`);
  console.log('====================================================\n');
});
