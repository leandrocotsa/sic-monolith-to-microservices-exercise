const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "My API",
    description: "Swagger documentation",
  },
  host: "localhost:5000",
  schemes: ["http"],
  tags: [
    // the sections that will be presented in swagger page
    { name: "Users", description: "Users related endpoints" },
  ],
  definitions: {
    // the objects used in the request and response bodies
    GetUser: {
      id: 1,
      name: "Example Name",
      email: "exampleEmail",
    },
    GetUsers: [
      {
        id: 1,
        name: "Example Name",
        email: "exampleEmail",
      },
    ],
    CreateUser: {
      id: 1,
      name: "Example Name",
      email: "exampleEmail",
    },
    UpdateUser: {
      id: 1,
      name: "Updated Name",
      email: "exampleEmail",
    },
    DeleteUser: {
      message: "User deleted successfully",
    },
  },
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
