const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function setTalentMatrixResult(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      talentMatrixResult: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeTalentMatrixResult(request, response) {
  const userId = getKeycloakUserId(request);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      talentMatrixResult: {
        disconnect: true,
      },
    },
  });

  response.sendStatus(204);
}

module.exports = {
  setTalentMatrixResult,
  removeTalentMatrixResult,
};