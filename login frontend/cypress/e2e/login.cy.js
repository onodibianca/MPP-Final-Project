describe('Login Test', () => {
    before(() => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        // Prevent Cypress from failing the test on uncaught exceptions
        return false;
      });
    });
  
    it('successfully logs in with "Remember Me"', () => {
      // Visit the login page
      cy.visit('http://localhost:3000/login');
      
      // Wait for the form to be visible
      cy.get('form', { timeout: 10000 }).should('be.visible');
  
      // Log the page's HTML for debugging
      cy.document().then((doc) => {
        console.log(doc.documentElement.innerHTML);
      });
  
      // Take a screenshot for debugging
      cy.screenshot('login-page-loaded');
  
      // Ensure the username input field exists and type in the username
      cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('aa');
  
      // Ensure the password input field exists and type in the password
      cy.get('input[name="password"]').should('be.visible').type('aaaaaa');
  
      // Ensure the "Remember Me" checkbox is visible and check it
      cy.get('input[name="rememberMe"]').check();
  
      // Submit the form
      cy.get('form').submit();
      
      // Check if the URL includes "/dashboard" after successful login
      cy.url().should('include', '/dashboard');
    });
  });
  