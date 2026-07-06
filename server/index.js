import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const port = Number(process.env.PORT || 18081);
const appPassword = process.env.APP_PASSWORD || 'change-me';
const sessionSecret = process.env.SESSION_SECRET || 'dev-secret';
const dataFile = path.resolve(rootDir, process.env.DATA_FILE || './data/fitness-records.json');

const app = express();
app.use(express.json({ limit: '1mb' }));

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify({ records: {} }, null, 2));
  }
}

async function readStore() {
  await ensureDataFile();
  const text = await fs.readFile(dataFile, 'utf8');
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === 'object' && parsed.records ? parsed : { records: {} };
  } catch {
    return { records: {} };
  }
}

async function writeStore(store) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  const tempFile = `${dataFile}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(store, null, 2));
  await fs.rename(tempFile, dataFile);
}

function makeToken() {
  const day = new Date().toISOString().slice(0, 10);
  return crypto.createHmac('sha256', sessionSecret).update(`${appPassword}:${day}`).digest('hex');
}

function isAuthorized(req) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : String(req.query?.token || '');
  const expected = makeToken();
  return token.length === expected.length && crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

function requireAuth(req, res, next) {
  if (!isAuthorized(req)) {
    res.status(401).json({ error: '未登录或登录已过期' });
    return;
  }
  next();
}

function validDateKey(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

app.post('/api/login', (req, res) => {
  const password = String(req.body?.password || '');
  if (password !== appPassword) {
    res.status(401).json({ error: '密码错误' });
    return;
  }
  res.json({ token: makeToken() });
});

app.get('/api/records', requireAuth, async (_req, res) => {
  const store = await readStore();
  res.json(store.records || {});
});

app.put('/api/records/:date', requireAuth, async (req, res) => {
  const date = req.params.date;
  if (!validDateKey(date)) {
    res.status(400).json({ error: '日期格式必须是 YYYY-MM-DD' });
    return;
  }
  const record = req.body;
  if (!record || typeof record !== 'object') {
    res.status(400).json({ error: '记录不能为空' });
    return;
  }
  const store = await readStore();
  store.records = store.records || {};
  store.records[date] = {
    ...record,
    date,
    updatedAt: new Date().toISOString()
  };
  await writeStore(store);
  res.json(store.records[date]);
});

app.get('/api/export', requireAuth, async (_req, res) => {
  const store = await readStore();
  const filename = `fitness-records-${new Date().toISOString().slice(0, 10)}.json`;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(JSON.stringify(store, null, 2));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', async () => {
  await ensureDataFile();
  console.log(`Fitness tracker listening on http://0.0.0.0:${port}`);
});
