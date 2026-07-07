import express, { Request, Response, Application } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware para parsear JSON en la lógica de negocio
app.use(express.json());

// Endpoint base de prueba para verificar la comunicación
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'up', 
    timestamp: new Date().toISOString(),
    message: 'Backend en Node.js + TypeScript funcionando correctamente' 
  });
});

app.listen(PORT, () => {
  console.log(`[🚀 Servidor]: Ejecutándose en http://localhost:${PORT}`);
});