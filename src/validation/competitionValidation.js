import { getCompetitionStatus } from "../repository/competitions.js";

export async function validateCompetitionExists(req, res, next) {
  try {
    const status = await getCompetitionStatus();

    if (status === null) {
      return res.status(404).json({
        error: "Competição não encontrada"
      });
    }

    next();
  } catch (error) {
    console.error("Erro ao verificar competição:", error.message);

    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

export async function validateCompetitionStart(req, res, next) {
  const { id } = req.params;

  try {
    const status = await getCompetitionStatus(id);

    if (status === null) {
      return res.status(404).json({
        error: "Competição não encontrada"
      });
    }

    if (status !== "NOT_STARTED") {
      return res.status(409).json({
        error: "A competição não pode ser iniciada nesse estado"
      });
    }

    next();
  } catch (error) {
    console.error("Erro ao validar início:", error.message);

    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

export async function validateCompetitionFinish(req, res, next) {
  const { id } = req.params;

  try {
    const status = await getCompetitionStatus(id);

    if (status === null) {
      return res.status(404).json({
        error: "Competição não encontrada"
      });
    }

    if (status !== "IN_PROGRESS") {
      return res.status(409).json({
        error: "Somente uma competição em andamento pode ser encerrada"
      });
    }

    next();
  } catch (error) {
    console.error("Erro ao validar encerramento:", error.message);

    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

export async function validateCompetitionNotStarted(req, res, next) {
  const { id } = req.params;

  try {
    const status = await getCompetitionStatus(id);

    if (status === null) {
      return res.status(404).json({
        error: "Competição não encontrada"
      });
    }

    if (status === "IN_PROGRESS") {
      return res.status(409).json({
        error: "A competição já está em andamento"
      });
    }

    next();
  } catch (error) {
    console.error("Erro ao validar estado:", error.message);

    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}


export async function validateCompetitionInProgress(req, res, next) {
  const { competitionId } = req.params;

  try {
    const status = await getCompetitionStatus(competitionId);

    if (status === null) {
      return res.status(404).json({
        error: "Competição não encontrada"
      });
    }

    if (status !== "IN_PROGRESS") {
      return res.status(409).json({
        error: "Só é possível registrar pontos durante a competição"
      });
    }

    next();
  } catch (error) {
    console.error("Erro ao validar pontuação:", error.message);

    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

