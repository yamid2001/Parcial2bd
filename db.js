const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.ipxatikkxjoeclxdmyni',
  host: 'aws-0-us-east-1.pooler.supabase.com',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

pool.connect()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));

module.exports = pool;
