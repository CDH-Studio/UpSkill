const prisma = require("../../../database");
const { getKeycloakUserId } = require("../../../utils/keycloak");

async function setTenure(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tenure: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeTenure(request, response) {
  const userId = getKeycloakUserId(request);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tenure: {
        disconnect: true,
      },
    },
  });

  response.sendStatus(204);
}

module.exports = {
  setTenure,
  removeTenure,
};