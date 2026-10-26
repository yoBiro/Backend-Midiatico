POST
/competition
Criar uma competição.

GET
/competition/:id/status
Consultar o status de uma competição.

POST
/competition/:id/start
Iniciar uma competição que esteja em NOT_STARTED.

POST
/competition/:id/finish
Finalizar uma competição que esteja em IN_PROGRESS.

Times
POST
/teams
Cadastrar um time com nome e escola.

GET
/teams
Listar todos os times.

GET
/teams/:id
Consultar um time pelo ID.

PUT
/teams/:id

DELETE
/teams/:id
Excluir um time.

PATCH
/competition/:competitionId/teams/:id/points