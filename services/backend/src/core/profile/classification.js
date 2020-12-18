const prisma = require("../../database");

async function setClassification(request, response) {
  const { id, userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      groupLevel: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeClassification(request, response) {
  const { userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      groupLevel: {
        disconnect: true,
      },
    },
  });

  response.sendStatus(204);
}

module.exports = {
  setClassification,
  removeClassification,
};
