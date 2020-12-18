const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const { profile } = require("../../core/profile");
const {
  userIdParamValidator,
  createProfileValidator,
  updateProfileValidator,
} = require("./utils/validator");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { langValidator } = require("../util/commonValidators");

const actingLevelRouter = require("./actingLevel");
const careerMobilityRouter = require("./careerMobility");
const competenciesRouter = require("./competencies");
const developmentalGoalsRouter = require("./developmentalGoals");
const educationsRouter = require("./educations");
const experiencesRouter = require("./experiences");
const groupLevelRouter = require("./groupLevel");
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

profileRouter.use("/:userId/actingLevel", actingLevelRouter);
profileRouter.use("/:userId/careerMobility", careerMobilityRouter);
profileRouter.use("/:userId/competencies", competenciesRouter);
profileRouter.use("/:userId/developmentalGoals", developmentalGoalsRouter);
profileRouter.use("/:userId/educations", educationsRouter);
profileRouter.use("/:userId/experiences", experiencesRouter);
profileRouter.use("/:userId/groupLevel", groupLevelRouter);
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

profileRouter
  .route("/")
  .all(keycloak.protect())
  .post([createProfileValidator], validationMiddlware, profile.createProfile);

profileRouter
  .route("/:userId")
  .all(keycloak.protect())
  .delete([userIdParamValidator], validationMiddlware, profile.deleteProfile)
  .put(
    [userIdParamValidator, updateProfileValidator],
    validationMiddlware,
    sameUserMiddleware,
    profile.updateProfile
  )
  .get(
    [userIdParamValidator, langValidator],
    validationMiddlware,
    profile.getProfile
  );

module.exports = profileRouter;
