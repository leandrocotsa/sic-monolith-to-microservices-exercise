const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API - Reviews Service",
    description: "Swagger documentation for the reviews service",
  },
  host: "localhost:5002",
  schemes: ["http"],
  tags: [{ name: "Reviews", description: "Reviews related endpoints" }],
  definitions: {
    GetReview: {
      id: 3,
      movieId: 2,
      userId: 1,
      text: "Classic sci-fi.",
    },
    CreateReview: {
      movieId: 1,
      userId: 2,
      text: "Amazing movie!",
    },
    UpdateReview: {
      movieId: 2,
      userId: 1,
      text: "Updated review text",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
