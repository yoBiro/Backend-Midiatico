import express from 'express';
import router from "./src/routes.js";
import cors from "cors";


const app = express();
const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origem não permitida pelo CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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