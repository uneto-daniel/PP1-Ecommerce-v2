const mysql = require('mysql');

// Configuração do banco de dados

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '88795318Da.*',
  database: 'ecommerce_pp1'  // Nome atualizado do banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados ecommerce_pp1');
});

module.exports = db;

