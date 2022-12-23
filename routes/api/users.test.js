require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const { DB_TEST_HOST, PORT } = process.env;
const User = require("../../models/users");
const app = require("../../app");

describe("test user routes", () => {
    let server;

    beforeAll(() => {
        server = app.listen(PORT);
    });

    afterAll(() => {
        server.close();
    });

    beforeEach(async () => {
        await mongoose.connect(DB_TEST_HOST);
    });

    // afterEach((done) => {
    //     mongoose.connection.db.dropCollection(() => {
    //         mongoose.connection.close(() => done());
    //     });
    // });

    //! 1. Ендпоінт відповідає з статус кодом 200 та токеном у тілі відповіді
    //! 2.у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
    //! 3. В базу даних успішно записався новий токен для користувача

    test("user login successfully", async () => {
        // AAA:
        //   Arrange - фаза підготовки
        //   Act - виконання дії
        //   Assert - перевірка результатів

        // Arrange
        const newUser = {
            password:
                "$2b$10$xSNn/97TjxcjgWI.oizkiekF2X0FvXlU8.ilLPcwDDm9lSk5TwtdK",
            email: "random@gmail.com",
            subscription: "starter",
            avatarURL: "http://example.com",
        };

        const user = await User.create(newUser);

        // Act
        const userLoginData = {
            email: "random@gmail.com",
            password: "qwertyuiop",
        };
        const response = await request(app)
            .post("/api/users/login")
            .send(userLoginData);

        // Assert
        expect(response.statusCode).toEqual(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                email: expect.any(String),
                subscription: expect.any(String),
                token: expect.any(String),
            })
        );

        const userFromDb = await User.findById(user._id);

        expect(userFromDb.token).toEqual(response.body.token);
    });
});
