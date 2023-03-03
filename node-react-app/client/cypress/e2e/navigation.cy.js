describe('Navigation Test', () => {
    it('Can view the home page', () => {
      cy.visit('/');
      cy.contains('CLUBHUB');
      cy.contains('University of Waterloo');
    });

    it('Can navigate to Explore page from navbar', () => {
        cy.get('[href*="explore"]').click();
        cy.contains('CLUBHUB');
        cy.url().should('include', '/explore');
    })

    it('Can navigate to club details page from explore', () => {
        cy.contains('Club Details').click({force: true});
        cy.url().should('include', '/clubs/');
        cy.contains('CLUBHUB');
        cy.contains('Description');
    })

    it('Can navigate to Home from navbar button', () => {
        cy.get('[href="/"]').contains("Home").click();
        cy.contains('CLUBHUB');
        cy.contains('University of Waterloo');
    })

    it('Can navigate to Home from navbar logo', () => {
        cy.get('[href="/"] p').click();
        cy.contains('CLUBHUB');
        cy.contains('University of Waterloo');
    })
  });