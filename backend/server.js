navigatorconst express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = 5000;

// Configuração do MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

app.use(bodyParser.json());

// Rota para registrar um novo usuário
const bcrypt = require('bcryptjs');

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao registrar usuário' });
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criptografar a senha' });
  }
});

// Rota para autenticar um usuário
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao autenticar usuário' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido', token });
  });
});


// Rota protegida para acessar o perfil
app.get('/profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [decoded.id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao buscar perfil' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.json(result[0]);
        });
    });
});

app.post('/cart', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
  
    if (!user_id || !product_id || !quantity) {
      return res.status(400).json({ message: 'User ID, Product ID e Quantity são obrigatórios' });
    }
  
    const query = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)';
    db.query(query, [user_id, product_id, quantity], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' });
      }
      res.status(201).json({ message: 'Produto adicionado ao carrinho' });
    });
  });
  app.get('/cart/:user_id', (req, res) => {
    const user_id = req.params.user_id;
  
    const query = `
        SELECT ci.cart_item_id, p.name, p.price, ci.quantity
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.product_id
        WHERE ci.user_id = ?`;
  
    db.query(query, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar itens do carrinho' });
      }
      res.json(result);
    });
  });
  app.post('/order', (req, res) => {
    const { user_id, total } = req.body;
  
    if (!user_id || !total) {
      return res.status(400).json({ message: 'User ID e Total são obrigatórios' });
    }
  
    const query = 'INSERT INTO orders (user_id, total) VALUES (?, ?)';
    db.query(query, [user_id, total], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar pedido' });
      }
  
      const order_id = result.insertId;
  
      const cartQuery = 'SELECT * FROM cart_items WHERE user_id = ?';
      db.query(cartQuery, [user_id], (err, cartItems) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao buscar itens do carrinho' });
        }
  
        const orderItems = cartItems.map(item => [
          order_id,
          item.product_id,
          item.quantity,
          item.quantity * item.price
        ]);
  
        const insertOrderItemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
        db.query(insertOrderItemsQuery, [orderItems], (err) => {
          if (err) {
            return res.status(500).json({ message: 'Erro ao adicionar itens ao pedido' });
          }
  
          const deleteCartQuery = 'DELETE FROM cart_items WHERE user_id = ?';
          db.query(deleteCartQuery, [user_id], (err) => {
            if (err) {
              return res.status(500).json({ message: 'Erro ao limpar o carrinho' });
            }
            res.status(201).json({ message: 'Pedido criado com sucesso' });
          });
        });
      });
    });
  });
hu      
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
