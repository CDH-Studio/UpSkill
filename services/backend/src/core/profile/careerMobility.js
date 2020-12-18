const prisma = require("../../database");

async function setCareerMobility(request, response) {
  const { id, userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      careerMobility: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeCareerMobility(request, response) {
  const { userId } = request.params;

  const { careerMobility } = await prisma.user.findOne({
    where: { id: userId },
    select: { careerMobility: { select: { id: true } } },
  });

  if (careerMobility) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        careerMobility: {
          disconnect: true,
        },
      },
    });
  }

  response.sendStatus(204);
}

module.exports = {
  setCareerMobility,
  removeCareerMobility,
};
