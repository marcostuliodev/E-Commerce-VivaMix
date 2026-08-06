import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

// 1. Configure o dotenv PRIMEIRO de tudo
dotenv.config();

const requiredEnvironmentVariables = [
  'DATABASE_URL',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'ADMIN_SETUP_KEY',
];

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
  (variable) => !process.env[variable]
);

if (missingEnvironmentVariables.length > 0) {
  throw new Error(
    `Variáveis de ambiente ausentes: ${missingEnvironmentVariables.join(', ')}`
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. AGORA importe as rotas, que dependem das variáveis do dotenv
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Conexão com o banco de dados
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const app = express();

const allowedOrigins = [
  'https://e-commerce-viva-mix.vercel.app', // URL de produção (sem a barra no final)
  'http://localhost:5173',
  'https://vivamix.marcostuliogc.com.br',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (como de apps mobile ou Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Rotas da API
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.get('/health', async (req, res) => {
  res.send('API Viva Mix funcionando!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
