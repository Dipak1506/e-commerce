const db = require("../models/dbConnect");

test("Connect to db", () => {
  const dbcon = new db({
    host: "localhost",
    user: "root",
    port: 5432,
    password: "root",
    database: "db",
  });
  expect(dbcon.connectToDb()).toBe("Database connection successfully");
});
