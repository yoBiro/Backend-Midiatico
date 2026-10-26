import express from "express";

import * as teamsController from "./controllers/teamsController.js";
import * as competitionController from "./controllers/competitionController.js";

import {
  validateCompetitionStart,
  validateCompetitionFinish,
  validateCompetitionInProgress
} from "./validation/competitionValidation.js";

import {
  validateTeamData,
  validateTeamUpdateData,
  validateTeamExists,
  validateTeamId,
  validateTeamPoints
} from "./validation/teamsValidation.js";

const router = express.Router();

router.post("/competition", competitionController.createCompetitionController);
router.get("/competition/:id/status", competitionController.getCompetitionStatusController);
router.post("/competition/:id/start", validateCompetitionStart, competitionController.startCompetitionController);
router.post("/competition/:id/finish", validateCompetitionFinish, competitionController.finishCompetitionController);

router.post( "/teams", validateTeamData, teamsController.createTeamController);
router.get("/teams", teamsController.getAllTeamsController);
router.get("/teams/:id", validateTeamId, validateTeamExists, teamsController.getTeamByIdController);

router.put("/teams/:id", validateTeamId, validateTeamExists, validateTeamUpdateData, teamsController.updateTeamController);
router.delete("/teams/:id", validateTeamId, validateTeamExists, teamsController.deleteTeamController);

router.patch("/competition/:competitionId/teams/:id/points", validateTeamId, validateTeamExists, validateCompetitionInProgress, validateTeamPoints, teamsController.updateTeamPartialPointsController);


export default router;