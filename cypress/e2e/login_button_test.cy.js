describe(
  'login button should work as intened',
  {
    retries: 4
  },
  () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it('if not logged in, the button should popup the dialouge box to login', () => {
      cy.get('[data-qa-id="loginBtn"]').click()

      cy.get('[data-qa-id="login-dialouge"]').should('exist')

      cy.get('[data-qa-id="login-dialouge-component"]').should('contain.text', 'LOGIN')
      cy.get('[data-qa-id="login-dialouge-component"]').should('contain.text', 'REGISTER')

      cy.get('[data-qa-id="login-input"]').type('cypresstestuser')
      cy.get('[data-qa-id="password-input"]').type('cypress123')

      cy.get('[data-qa-id="login-btn"]').click()

      // an api call to the backend must be made
      cy.intercept('POST', 'https://canarytype.azurewebsites.net/api/Login').as('loginCall')
      cy.wait('@loginCall').its('response.statusCode').should('eq', 200)

      // should see a notification poping as well.
      cy.get('div.Vue-Toastification__toast-body').should('contain', 'Logged in Successfully')

      // wait for the notification to disappear
      cy.wait(5000)

      // now since the user is logged in the login button should not show the popup

      cy.get('[data-qa-id="login-button-after-login"]').click()
      cy.get('[data-qa-id="login-menu-list"]').should('contain', 'LOG OUT')
      cy.get('[data-qa-id="login-menu-list"]').should('contain', 'PROFILE')
    })
  }
)
