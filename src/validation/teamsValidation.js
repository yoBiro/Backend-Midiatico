import { getTeamById } from "../repository/teams.js";

export async function validateTeamExists(req, res, next) {
  const { id } = req.params;

  try {
    const team = await getTeamById(id);
    if (!team) {
      return res.status(404).json({ error: "Time não encontrado" });
    }
    next();
  } catch (error) {
    console.error("Erro ao validar time:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function validateTeamData(req, res, next) {
  const { name, school } = req.body;

  if (!name || !school) {
    return res.status(400).json({ error: "Nome e escola são obrigatórios" });
  }

  next();
}

export async function validateTeamUpdateData(req, res, next) {
  const { name, school } = req.body;

  if (!name && !school) {
    return res.status(400).json({ error: "Pelo menos um campo (nome ou escola) deve ser fornecido para atualização" });
  }

  next();
}

export function validateTeamPoints(req, res, next) {
  const { total_points, partial_points } = req.body;

  if (partial_points === undefined) {
    return res.status(400).json({
      error: "O campo partial_points é obrigatório"
    });
  }

  if (!Number.isSafeInteger(partial_points) || partial_points <= 0) {
    return res.status(400).json({
      error: "partial_points deve ser um inteiro maior que zero"
    });
  }

  next();
}

export async function validateTeamId(req, res, next) {
  const { id } = req.params;

  if (!id || isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ error: "ID do time inválido" });
  }

  next();
}