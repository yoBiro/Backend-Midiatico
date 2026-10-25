import { getCompetitionStatus, updateCompetitionStatus, createCompetition } from "../repository/competitions.js";

export async function createCompetitionController(req, res) {
  try {
    const competitionId = await createCompetition();
    res.status(201).json({ id: competitionId, status: "NOT_STARTED" });
  } catch (error) {
    console.error("Erro ao criar competição:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function updateCompetitionStatusController(req, res) {
  const { newStatus } = req.body;
  const { id } = req.params;

  try {
    const updated = await updateCompetitionStatus(id, newStatus);
    if (!updated) {
      return res.status(404).json({ error: "Competição não encontrada" });
    }
    res.json({ message: "Status da competição atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar status da competição:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function getCompetitionStatusController(req, res) {
  const { id } = req.params;

  try {
    const status = await getCompetitionStatus(id);

    if (status === null) {
      return res.status(404).json({
        error: "Competição não encontrada"
      });
    }

    return res.json({ status });
  } catch (error) {
    console.error("Erro ao consultar competição:", error.message);
    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

export async function startCompetitionController(req, res) {
  const { id } = req.params;

  try {
    const updated = await updateCompetitionStatus(id, "IN_PROGRESS");

    if (!updated) {
      return res.status(409).json({
        error: "Não foi possível iniciar a competição"
      });
    }

    return res.json({
      message: "Competição iniciada com sucesso",
      status: "IN_PROGRESS"
    });
  } catch (error) {
    console.error("Erro ao iniciar competição:", error.message);
    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

export async function finishCompetitionController(req, res) {
  const { id } = req.params;

  try {
    const updated = await updateCompetitionStatus(id, "COMPLETED");

    if (!updated) {
      return res.status(409).json({
        error: "Não foi possível finalizar a competição"
      });
    }

    return res.json({
      message: "Competição finalizada com sucesso",
      status: "COMPLETED"
    });
  } catch (error) {
    console.error("Erro ao finalizar competição:", error.message);
    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}
