import express from 'express';
import router from "./src/routes.js";

const app = express();

app.use(express.json());
app.use(router);

app.get('/status', (req, res) => {
  try {
    res.send('RANKING - FUNCIONANDO');
  } catch (error) {
    res.status(500).send('RANKING - ERROR');
  }
});

app.listen(3000, () => {
  console.log('SERVER FUNCIONANDO EM http://localhost:3000');
});