const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure aqui os dados do seu banco PostgreSQL
const pool = new Pool({
  user: 'postgres',          // seu usuário do PostgreSQL
  host: 'localhost',
  database: 'ecofarm',      // substitua pelo nome do seu banco
  password: 'dragon20',      // substitua pela sua senha
  port: 5432,
});

// Exemplo de rota que retorna dados de uma tabela chamada "clientes"
app.get('/clientes', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM clientes');
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Servidor backend rodando em http://localhost:3001');
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO login (id, email, senha) VALUES (DEFAULT, $1, $2) RETURNING *',
      [email, senha]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir login:', error.message);
    res.status(500).json({ error: error.message });
  }
});