const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecofarm',
  password: 'dragon20',
  port: 5432,
});

// Testa conexão ao iniciar
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Erro ao conectar ao banco:', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('❌ Erro ao testar banco:', err.stack);
    }
    console.log('✅ Conectado ao banco em:', result.rows[0].now);
  });
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ecofarmusjt@gmail.com',
    pass: 'jpwy tsdn xdkd tcsx' // app password
  }
});

// Enviar código de verificação
app.post('/send-reset-code', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await pool.query('SELECT * FROM login WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'Email não encontrado.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await pool.query(
      `INSERT INTO alterar_senha (email, code, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '15 minutes')`,
      [email, code]
    );

    const mailOptions = {
      from: 'ecofarmusjt@gmail.com',
      to: email,
      subject: 'Código de verificação - EcoFarm',
      text: `Seu código de verificação é: ${code}\n\nEle expira em 15 minutos.`
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Código enviado para ${email}: ${code}`);
    res.json({ message: 'Código enviado com sucesso.' });

  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error.message);
    res.status(500).json({ message: 'Erro ao enviar código.' });
  }
});

// Registro
app.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO login (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

// Login
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
    res.status(500).json({ error: 'Erro ao processar login.' });
  }
});

// Verificar código
app.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const resultado = await pool.query(
      'SELECT code FROM alterar_senha WHERE email = $1 ORDER BY id DESC LIMIT 1',
      [email]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum código encontrado para este email.' });
    }

    const codigoValido = resultado.rows[0].code;

    if (codigoValido === code) {
      return res.status(200).json({ message: 'Código válido.' });
    } else {
      return res.status(400).json({ message: 'Código incorreto.' });
    }
  } catch (err) {
    console.error("Erro ao verificar código:", err);
    return res.status(500).json({ message: 'Erro interno ao verificar o código.' });
  }
});

// Inicia o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
