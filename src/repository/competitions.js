/*
CREATE TABLE competition (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM(
        'NOT_STARTED',
        'IN_PROGRESS',
        'COMPLETED'
    ) NOT NULL DEFAULT 'NOT_STARTED'
);
*/

import { connection } from '../config/database.js';

export async function getCompetitionStatus(id) {
  const pool = await connection();

  const query = `
    SELECT status
    FROM competition
    WHERE id = ?
  `;

  const [rows] = await pool.execute(query, [id]);

  return rows.length > 0 ? rows[0].status : null;
}

export async function updateCompetitionStatus(id, newStatus) {
  const pool = await connection();

  const query = `
    UPDATE competition
    SET status = ?
    WHERE id = ?
  `;

  const [result] = await pool.execute(query, [newStatus, id]);

  return result.affectedRows > 0;
}

export async function createCompetition() {
  const pool = await connection();

  const query = `
    INSERT INTO competition (status) VALUES ('NOT_STARTED')
  `;

  try {
    const [result] = await pool.execute(query);
    return result.insertId;
  } catch (error) {
    console.error("Falha ao criar competição:", error.message);
    throw error;
  }
}