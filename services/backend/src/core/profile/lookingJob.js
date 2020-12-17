const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function setLookingJob(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lookingJob: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeLookingJob(request, response) {
  const userId = getKeycloakUserId(request);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lookingJob: {
        disconnect: true,
      },
    },
  });

  response.sendStatus(204);
}

module.exports = {
  setLookingJob,
  removeLookingJob,
};