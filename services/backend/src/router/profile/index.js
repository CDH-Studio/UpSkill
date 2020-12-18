const { Router } = require("express");

const careerMobilityRouter = require("./careerMobility");
const classificationRouter = require("./classification");
const competenciesRouter = require("./competencies");
const developmentalGoalsRouter = require("./developmentalGoals");
const educationsRouter = require("./educations");
const experiencesRouter = require("./experiences");
const lookingJobRouter = require("./lookingJob");
const mentorshipSkillsRouter = require("./mentorshipSkills");
const officeLocationRouter = require("./officeLocation");
const qualifiedPoolsRouter = require("./qualifiedPools");
const relocationLocationsRouter = require("./relocationLocations");
const secondLangProfsRouter = require("./secondLangProfs");
const securityClearanceRouter = require("./securityClearance");
const skillsRouter = require("./skills");
const talentMatrixResultRouter = require("./talentMatrixResult");
const tenureRouter = require("./tenure");
const visibilityRouter = require("./visibility");

const profileRouter = Router();

profileRouter.use("/:userId/careerMobility", careerMobilityRouter);
profileRouter.use("/:userId/classification", classificationRouter);
profileRouter.use("/:userId/competencies", competenciesRouter);
profileRouter.use("/:userId/developmentalGoals", developmentalGoalsRouter);
profileRouter.use("/:userId/educations", educationsRouter);
profileRouter.use("/:userId/experiences", experiencesRouter);
profileRouter.use("/:userId/lookingJob", lookingJobRouter);
profileRouter.use("/:userId/mentorshipSkills", mentorshipSkillsRouter);
profileRouter.use("/:userId/officeLocation", officeLocationRouter);
profileRouter.use("/:userId/qualifiedPools", qualifiedPoolsRouter);
profileRouter.use("/:userId/relocationLocations", relocationLocationsRouter);
profileRouter.use("/:userId/secondLangProfs", secondLangProfsRouter);
profileRouter.use("/:userId/securityClearance", securityClearanceRouter);
profileRouter.use("/:userId/skills", skillsRouter);
profileRouter.use("/:userId/talentMatrixResult", talentMatrixResultRouter);
profileRouter.use("/:userId/tenure", tenureRouter);
profileRouter.use("/:userId/visibility", visibilityRouter);

module.exports = profileRouter;
