const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db'); // Asegúrate de que db.js exporte correctamente el pool

const PORT = 3000;

app.use(cors());
app.use(express.json());

// ================== RESTAURANTE ==================
app.get('/restaurantes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurante');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/restaurantes', async (req, res) => {
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/restaurantes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await pool.query(
      'UPDATE restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5 RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/restaurantes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM restaurante WHERE id_rest = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== EMPLEADOS ==================
app.get('/empleados/:id_rest', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleado WHERE id_rest = $1', [req.params.id_rest]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/empleados', async (req, res) => {
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
      [nombre, rol, id_rest]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/empleados/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await pool.query(
      'UPDATE empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4 RETURNING *',
      [nombre, rol, id_rest, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/empleados/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM empleado WHERE id_empleado = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== PRODUCTOS ==================
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/productos', async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *',
      [nombre, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  try {
    const result = await pool.query(
      'UPDATE producto SET nombre = $1, precio = $2 WHERE id_prod = $3 RETURNING *',
      [nombre, precio, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/productos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM producto WHERE id_prod = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== PEDIDOS ==================
app.get('/pedidos/:id_rest', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pedido WHERE id_rest = $1', [req.params.id_rest]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/pedidos', async (req, res) => {
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
      [fecha, id_rest, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4 RETURNING *',
      [fecha, id_rest, total, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/pedidos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pedido WHERE id_pedido = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== DETALLE PEDIDO ==================
app.get('/detallepedido/:id_pedido', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM detallepedido WHERE id_pedido = $1', [req.params.id_pedido]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/detallepedido', async (req, res) => {
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO detallepedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/detallepedido/:id', async (req, res) => {
  const { id } = req.params;
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await pool.query(
      'UPDATE detallepedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5 RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/detallepedido/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM detallepedido WHERE id_detalle = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== TODO EN UNO ==================
app.get('/todo', async (req, res) => {
  try {
    const empleados = await pool.query('SELECT * FROM empleado');
    const pedidos = await pool.query('SELECT * FROM pedido');
    const detalles = await pool.query('SELECT * FROM detallepedido');

    res.json({
      empleados: empleados.rows,
      pedidos: pedidos.rows,
      detallepedido: detalles.rows
    });
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== NUEVOS ENDPOINTS ==================

// 1. Obtener todos los productos de un pedido específico (ya existe, pero se mantiene)
// GET http://localhost:3000/detallepedido/1

// 2. Obtener los productos más vendidos (más de X unidades)
app.get('/productos/masvendidos/:cantidad', async (req, res) => {
  const { cantidad } = req.params;
  try {
    const result = await pool.query(
      `SELECT p.nombre, SUM(d.cantidad) AS total_vendido
       FROM detallepedido d
       JOIN producto p ON d.id_prod = p.id_prod
       GROUP BY p.nombre
       HAVING SUM(d.cantidad) > $1
       ORDER BY total_vendido DESC`,
      [cantidad]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// 3. Obtener el total de ventas por restaurante
app.get('/ventas/restaurante', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.nombre AS restaurante, SUM(p.total) AS total_ventas
       FROM pedido p
       JOIN restaurante r ON p.id_rest = r.id_rest
       GROUP BY r.nombre
       ORDER BY total_ventas DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// 4. Obtener los pedidos realizados en una fecha específica
app.get('/pedidos/fecha/:fecha', async (req, res) => {
  const { fecha } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM pedido WHERE DATE(fecha) = $1`,
      [fecha]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// 5. Obtener los empleados por rol en un restaurante
app.get('/empleados/porrol/:id_rest/:rol', async (req, res) => {
  const { id_rest, rol } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM empleado WHERE id_rest = $1 AND rol = $2`,
      [id_rest, rol]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== INICIAR SERVIDOR ==================
app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:${3000}`);
});