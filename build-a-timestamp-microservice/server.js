import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api{/:date}', (req, res) => {
  const { date } = req.params;
  let parsed;

  if (!date) {
    parsed = new Date();
  } else if (/^-?\d+$/.test(date)) {
    parsed = new Date(Number(date));
  } else {
    parsed = new Date(date);
  }

  if (isNaN(parsed.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsed.getTime(),
    utc: parsed.toUTCString()
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});