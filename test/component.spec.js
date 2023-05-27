const supertest = require("supertest");
const app = require("../../../BEJS1-Chapter5/app.js");
const truncate = require("../../../BEJS1-Chapter5/utils/truncate.js");

// reset database component
const component = {
    id: null,
    name: "Strach",
    description: "This is Strach",
    supplier_id: [1],
};

describe("TEST /components post", () => {
    test("add component berhasil (positif)", async () => {
      const response = await supertest(app).post("/components").send(component);
  
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        status: true,
        message: "success",
        data: {
          id: expect.any(Number),
          name: component.name,
          description: component.description,
          updatedAt: response.body.data.updatedAt,
          createdAt: response.body.data.createdAt,
        },
      });
  
      component.id = response.body.data.id;
    });
  
    test("add component nama kosong (negatif)", async () => {
      const component1 = {
        name: "",
        description: "Corn Strach",
        supplier_id: [1, 12],
      };
  
      const response = await supertest(app).post("/components").send(component1);
  
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        status: false,
        message: "name must be provided",
        data: null,
      });
    });
  
    test("add component supplier_id tidak ditemukan (negatif)", async () => {
      const component1 = {
        name: "Strach",
        description: "This is strach",
        supplier_id: [2],
      };
  
      const response = await supertest(app).post("/components").send(component1);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: false,
        message: "One or more supplier IDs not found",
        data: null,
      });
    });
});

describe("TEST /components get all", () => {
    test("Get all components (positif)", async () => {
      const response = await supertest(app).get("/components");
  
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe("success");
      expect(response.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
          }),
        ])
      );
    });
});

describe("TEST /components/{id} get endpoint", () => {
    test("Get component by ID (positive)", async () => {
      const response = await supertest(app).get("/components/" + component.id);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        status: true,
        message: "success",
        data: {
          id: component.id,
          name: expect.any(String),
          description: expect.any(String),
          Suppliers: expect.anything(),
          Products: expect.anything(),
        },
      });
  
      const { Suppliers, Products } = response.body.data;
  
      if (Suppliers) {
        expect(Suppliers).toBeInstanceOf(Array);
  
        expect(Suppliers.length).toBeGreaterThanOrEqual(0);
        Suppliers.forEach((supplier) => {
          expect(supplier).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            address: expect.any(String),
          });
        });
      }
  
      if (Products) {
        expect(Products).toBeInstanceOf(Array);
  
        expect(Products.length).toBeGreaterThanOrEqual(0);
        Products.forEach((product) => {
          expect(product).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            quantity: expect.any(Number),
          });
        });
      }
    });
  
    test("Get component by ID (negatif)", async () => {
      const id = 99;
  
      const response = await supertest(app).get("/components/" + id);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: false,
        message: `can't find component with id ${id}`,
        data: null,
      });
    });
});

describe("TEST /components/{id} put endpoint", () => {
    test("Put component by ID (positif)", async () => {
      const response = await supertest(app)
        .put("/components/" + component.id)
        .send(component);
  
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        status: true,
        message: "success",
        data: null,
      });
    });
  
    test("Put component by ID (negatif)", async () => {
      const component1 = {
        id: 99,
        name: "Strach",
        description: "This is Strach",
        supplier_id: [1, 12],
      };
  
      const response = await supertest(app)
        .put("/components/" + component1.id)
        .send(component1);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: false,
        message: `can't find component with id ${component1.id}`,
        data: null,
      });
    });
});

describe("TEST /components/{id} delete endpoint", () => {
    test("Delete component by ID (positif)", async () => {
      const response = await supertest(app).delete("/components/" + component.id);
  
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        status: true,
        message: "success",
        data: null,
      });
    });
  
    test("Delete component by ID (negatif)", async () => {
      const response = await supertest(app).delete("/components/" + component.id);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: false,
        message: `can't find component with id ${component.id}`,
        data: null,
      });
    });
});