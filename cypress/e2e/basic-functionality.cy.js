import "@4tw/cypress-drag-drop";


describe("Checking basic functionality", () => {
  beforeEach(() => {
    window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));
    cy.setCookie("refreshToken", "test-refreshToken");
    cy.intercept("GET", "api/ingredients", {fixture: "ingredients"});
    cy.intercept("GET", "api/auth/user", {fixture: "user"});
    cy.intercept("POST", "api/orders", {fixture: "order"});
    cy.visit("http://localhost:3000/");
  });

  it("Creating an order", () => {
    cy.get("[data-test-id=643d69a5c3f7b9001cfa093c]").drag("[data-test-id=constructor-drop]");
    cy.get("[data-test-id=643d69a5c3f7b9001cfa0943]").drag("[data-test-id=constructor-drop]");
    cy.get("[data-test-id=643d69a5c3f7b9001cfa0944]").drag("[data-test-id=constructor-drop]");
    cy.get("[data-test-id=643d69a5c3f7b9001cfa0941]").drag("[data-test-id=constructor-drop]");
    cy.get("[data-test-id=btn-make-an-order]").click();
    cy.get("[data-test-id=order-number]").contains("26475");
    cy.get("[data-test-id=modal-close]").click();
  });

  it("Modal window with ingredient details", () => {
    cy.get("[data-test-id=643d69a5c3f7b9001cfa093c]").click();
    cy.get("[data-test-id=modal-header]").contains("Детали ингредиента");
    cy.get("[data-test-id=ingredient-name]").contains("Краторная булка N-200i");
    cy.get("[data-test-id=modal-close]").click();
  });
});
