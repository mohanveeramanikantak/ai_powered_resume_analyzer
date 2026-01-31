#!/usr/bin/env node

const { spawn } = require('child_process');
const net = require('net');
const fs = require('fs');
const path = require('path');

const START_PORT = 3000;

function removeStaleLock() {
  const lockPath = path.join(process.cwd(), '.next', 'dev', 'lock');
  try {
    if (fs.existsSync(lockPath)) {
      fs.unlinkSync(lockPath);
      console.log('✓ Removed stale dev lock\n');
    }
  } catch (e) {
    // Ignore - lock may be held by another process
  }
}
const MAX_PORTS_TO_TRY = 20;

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.once('error', () => resolve(false));
    server.listen(port);
  });
}

async function findAvailablePort() {
  for (let port = START_PORT; port < START_PORT + MAX_PORTS_TO_TRY; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
    console.log(`Port ${port} is busy, trying next...`);
  }
  throw new Error(`No available port found in range ${START_PORT}-${START_PORT + MAX_PORTS_TO_TRY - 1}`);
}

removeStaleLock();

findAvailablePort()
  .then((port) => {
    console.log(`\n✓ Starting Next.js on http://localhost:${port}\n`);
    const child = spawn('npx', ['next', 'dev', '-p', String(port)], {
      stdio: 'inherit',
      shell: true,
    });
    child.on('exit', (code) => process.exit(code || 0));
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
