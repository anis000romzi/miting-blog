/**
 * - Login spec
 *   - should display home page correctly when logged out
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display home page correctly when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display home page correctly when logged out', () => {
    cy.get('nav').contains(/^Login$/).should('be.visible');
  });

  it('should display login page correctly', () => {
    cy.get('nav').contains(/^Login$/).click();

    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('nav').contains(/^Login$/).click();
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('nav').contains(/^Login$/).click();

    cy.get('input[placeholder="Email"]').type('anis000romzi@gmail.com');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('nav').contains(/^Login$/).click();

    cy.get('input[placeholder="Email"]').type('anis000romzi@gmail.com');

    cy.get('input[placeholder="Password"]').type('wrong_password');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display home page correctly when email and password are correct', () => {
    cy.get('nav').contains(/^Login$/).click();

    cy.get('input[placeholder="Email"]').type('anis000romzi@gmail.com');

    cy.get('input[placeholder="Password"]').type('123456');

    cy.get('button').contains(/^Login$/).click();

    cy.get('button[class="new-thread-button"]').should('be.visible');
  });
});
