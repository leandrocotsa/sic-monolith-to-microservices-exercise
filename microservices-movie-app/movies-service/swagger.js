const swaggerAutogen = require("swagger-autogen")();
const doc = {
    info: {
        title: "Movies Service API",
        description: "Swagger documentation",
    },
    host: "localhost:5001",
    schemes: ["http"],
    tags: [ // the sections that will be presented in swagger page
        { name: "Movies", description: "Movies related endpoints" },
    ],
    definitions: { // the objects used in the request and response bodies
        GetMovie: { 
            id: 123,
            title: "Example Title",
            year: 2020  
        },
        CreateMovie: { 
            title: "Example Title",
            year: 2020
        },
        UpdateMovie: {
            title: "Updated Title",
            year: 2021
        },
        DeleteMovie: {
            id: 123
        }
    }
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);