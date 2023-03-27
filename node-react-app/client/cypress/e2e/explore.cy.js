describe("Explore page functionality", () => {
  it("Can visit the explore page", () => {
    cy.visit("/explore");
    cy.contains("Club Details");
  });

  it("Can navigate to club page", () => {
    cy.contains("Club Details").click({ force: true });
    cy.url().should("include", "/clubs/");
    cy.contains("CLUBHUB");
    cy.contains("Description");
    cy.visit("/explore");
  });

  it("Can view club name", () => {
    cy.contains("h6", "Club");
  });

  it("Can read club description", () => {
    cy.contains("p", "club");
  });

  it("Can view club tags", () => {
    cy.contains("div", "All").click({ force: true });
    cy.contains("div", "Academic");
  });

  it("Can select club tags", () => {
    cy.contains("li", "Academic").click();
    cy.contains("div", "Academic").should("have.class", "MuiSelect-root");
    cy.get("input").should("have.value", "academic");
  });

  it("Can search for clubs", () => {
    cy.get(`input[type="text"]`).type("greek", { force: true });
    cy.contains("h6", "Greek");
  });

  it("Can clear search", () => {
    cy.get(`input[type="text"]`).clear({ force: true });
    cy.contains("h6", "Greek").should("not.exist");
  });
});
