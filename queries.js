const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'db.phcmupptapblkyritndw.supabase.co',
  database: 'postgres',
  password: 'SPa1hmLUdSpASg4V',
  port: 5432,
});

const getCurriculos = (request, response) => {
  pool.query('SELECT * FROM rodobens ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCurriculoByNome = (request, response) => {
  const nome = request.params.nome;

  pool.query('SELECT * FROM rodobens WHERE nome = $1', [nome], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createCurriculo = (request, response) => {
  const {
    nome,
    idade,
    trabalho,
    experiencia,
    cursos
  } = request.body;

  pool.query(
    'INSERT INTO rodobens (nome,idade,trabalho,experiencia,cursos) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [nome,idade,trabalho,experiencia,cursos],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ id: results.rows[0].id });
    }
  );
};

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    nome,
    idade,
    trabalho,
    experiencia,
    cursos
  } = request.body;

  pool.query(
    'UPDATE rodobens SET nome = $1, idade = $2, trabalho = $3, experiencia = $4, cursos = $5 WHERE id = $6',
    [nome,idade,trabalho,experiencia,cursos, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteCurriculo = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM rodobens WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getCurriculos,
  getCurriculoByNome,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo,
};