const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/admin/userStatuses";

describe(`PUT ${path}`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).put(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when not authorised", () => {
    test("should not process request when user has incorrect keycloak role - 403", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["role"]));

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const body = {
        [faker.random.uuid()]: "ACTIVE",
        [faker.random.uuid()]: "ACTIVE",
        [faker.random.uuid()]: "INACTIVE",
        [faker.random.uuid()]: "INACTIVE",
        [faker.random.uuid()]: "INACTIVE",
        [faker.random.uuid()]: "HIDDEN",
        [faker.random.uuid()]: "HIDDEN",
      };

      let res;

      beforeAll(async () => {
        res = await request(app)
          .put(path)
          .set("Authorization", getBearerToken(["manage-users"]))
          .send(body);
      });

      afterAll(() => {
        prisma.user.update.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        Object.keys(body).forEach((id) => {
          expect(prisma.user.update).toHaveBeenCalledWith({
            where: {
              id,
            },
            data: {
              status: body[id],
            },
          });
        });
      });

      test("should return expected result", () => {
        expect(res.text).toStrictEqual("");
      });
    });

    test("should trigger error if there's a database problem - 500", async () => {
      prisma.user.update.mockRejectedValue(new Error());
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-users"]))
        .send({ [faker.random.uuid()]: "ACTIVE" });

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalled();

      prisma.user.update.mockReset();
    });

    test("should throw validation error if keys of body is not a UUID - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-users"]))
        .send({ notAUuid: "" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    test("should throw validation error if values of body is not ACTIVE, INACTIVE, HIDDEN - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-users"]))
        .send({ [faker.random.uuid()]: "InvalidContent" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });
});
