const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecofarm',
  password: 'dragon20',
  port: 5432,
});

// Testa a conexão com o banco ao iniciar
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Erro ao conectar ao banco de dados:', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('❌ Erro ao executar consulta de teste:', err.stack);
    }
    console.log('✅ Conectado ao PostgreSQL em:', result.rows[0].now);
  });
});

// Rota de cadastro
app.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO login (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar:', error.message);

    if (error.code === '23505') {
      // Código de erro para violação de unicidade no PostgreSQL
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM login WHERE email = $1 AND senha = $2',
      [email, senha]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(401).json({ error: 'Email ou senha incorretos' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(500).json({ error: 'Erro ao processar login.' });
  }
});

// Inicializa o servidor na porta 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
