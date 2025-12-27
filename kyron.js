import { writeFileSync } from 'fs';
import { resolve } from 'path';

const LOG_FILE = resolve(process.cwd(), 'logs.txt');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const logEntry = `
══════════════════════════════════════════════════════════
TIME: ${data.time || new Date().toISOString()}
GAME: ${data.place} | ${data.job}
PLAYER: ${data.player}
SCRIPT: ${data.script}
──────────────────────────────────────────────────────────
${data.source || 'no source'}
══════════════════════════════════════════════════════════
`;

    try {
      writeFileSync(LOG_FILE, logEntry, { flag: 'a' });
      res.status(200).json({ status: "logged" });
    } catch (err) {
      res.status(500).json({ error: "failed" });
    }
  } else {
    res.status(200).json({ 
      status: "KRYRON Ω LOGGER ACTIVE", 
      logs: "check /logs.txt in your project files",
      total: "unlimited"
    });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
