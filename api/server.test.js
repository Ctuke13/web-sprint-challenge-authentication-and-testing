const Users = require("./users/users-model");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

test("sanity", () => {
  expect(true).toBe(true);
});

describe("[POST] /teams/:id", () => {
  const user = { username: "John", password: "1234" };
  test("resolves the newly created user", async () => {
    const result = await Users.insert(user);
    expect(result).toMatchObject(user);
  });
  test("adds the team to the users table", async () => {
    const users = await db("users");
    expect(users).toHaveLength(1);
  });
});
