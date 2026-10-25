import { getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  updateTeamTotalPoints,
  updatePartialTeamPoints
} from "../repository/teams.js";

export async function getAllTeamsController(req, res) {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error("Erro ao buscar equipes:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function getTeamByIdController(req, res) {
  const { id } = req.params;

  try {
    const team = await getTeamById(id);
    if (!team) {
      return res.status(404).json({ error: "Time não encontrado" });
    }
    res.json(team);
  } catch (error) {
    console.error(`Erro ao buscar time com ID ${id}:`, error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function createTeamController(req, res) {
  const { name, school } = req.body;

  try {
    const teamId = await createTeam(name, school);
    res.status(201).json({ id: teamId, name, school });
  } catch (error) {
    console.error("Erro ao criar time:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function updateTeamController(req, res) {
  const { id } = req.params;
  const { name, school } = req.body;

  try {
    const updated = await updateTeam(id, name, school);
    if (!updated) {
      return res.status(404).json({ error: "Time não encontrado" });
    }
    res.json({ message: "Time atualizado com sucesso" });
  } catch (error) {
    console.error(`Erro ao atualizar time com ID ${id}:`, error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function deleteTeamController(req, res) {
  const { id } = req.params;

  try {
    const deleted = await deleteTeam(id);
    if (!deleted) {
      return res.status(404).json({ error: "Time não encontrado" });
    }
    res.json({ message: "Time deletado com sucesso" });
  } catch (error) {
    console.error(`Erro ao deletar time com ID ${id}:`, error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function updateTeamTotalPointsController(req, res) {
  const { id } = req.params;
  const { total_points } = req.body;

  try {
    const updated = await updateTeamTotalPoints(id, total_points);
    if (!updated) {
      return res.status(404).json({ error: "Time não encontrado" });
    }
    res.json({ message: "Total de pontos atualizado com sucesso" });
  } catch (error) {
    console.error(`Erro ao atualizar total de pontos do time com ID ${id}:`, error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function updateTeamPartialPointsController(req, res) {
  const { id } = req.params;
  const { partial_points } = req.body;

  try {
    const updated = await updatePartialTeamPoints(id, partial_points);
    if (!updated) {
      return res.status(404).json({ error: "Time não encontrado" });
    }
    res.json({ message: "Pontos parciais atualizados com sucesso" });
  } catch (error) {
    console.error(`Erro ao atualizar pontos parciais do time com ID ${id}:`, error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}