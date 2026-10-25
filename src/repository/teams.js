/*
CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    school VARCHAR(150) NOT NULL,
    total_points INT NOT NULL DEFAULT 0
);
*/

import { connection } from '../config/database.js';

export async function getAllTeams() {
  const pool = await connection();

  const query = `
    SELECT * FROM teams
  `

  try {
    const [rows] = await pool.execute(query);
    return rows;
  } catch (error) {
    console.error("Falha ao buscar todos times:", error.message);
    throw error;
  } 
}

export async function getTeamById(id) {
  const pool = await connection();

  const query = `
    SELECT * FROM teams WHERE id = ?
  `

  try {
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  } catch (error) {
    console.error(`Falha ao buscar time com ID ${id}:`, error.message);
    throw error;
  } 
}

export async function createTeam(name, school) {
  const pool = await connection();

  const query = `
    INSERT INTO teams (name, school) VALUES (?, ?)
  `

  try {
    const [result] = await pool.execute(query, [name, school]);
    return result.insertId;
  } catch (error) {
    console.error("Falha ao criar time:", error.message);
    throw error;
  } 
}

export async function updateTeam(id, name, school) {
  const pool = await connection();

  const query = `
    UPDATE teams SET name = ?, school = ? WHERE id = ?
  `

  try {
    const [result] = await pool.execute(query, [name, school, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Falha ao atualizar time com ID ${id}:`, error.message);
    throw error;
  } 
}

export async function deleteTeam(id) {
  const pool = await connection();

  const query = `
    DELETE FROM teams WHERE id = ?
  `

  try {
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Falha ao deletar time com ID ${id}:`, error.message);
    throw error;
  } 
}

export async function updateTeamTotalPoints(id, points) {
  const pool = await connection();

  const query = `
    UPDATE teams SET total_points = ? WHERE id = ?
  `

  try {
    const [result] = await pool.execute(query, [points, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Falha ao atualizar pontos do time com ID ${id}:`, error.message);
    throw error;
  } 
}


export async function updatePartialTeamPoints(id, points) {
  const pool = await connection();
  
  console.log("Parâmetros recebidos:", { id, points });

  const query = `
    UPDATE teams
    SET total_points = total_points + ?
    WHERE id = ?
  `;

  try {
    const [result] = await pool.execute(query, [points, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(
      `Falha ao atualizar pontos do time com ID ${id}:`,
      error.message
    );
    throw error;
  }
}
