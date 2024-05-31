describe(
  'save result without login',
  {
    retries: 4
  },
  () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should open login dialouge', () => {
      cy.get('[data-qa-id="textarea"]').click()
      cy.get('[data-qa-id="textarea"]').type('random words')

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(10000)

      // after waiting 10 seconds, the timer should become zero
      cy.get('[data-qa-id="timer"]').should('contain', 0)

      // button should be available to save results
      cy.get('[data-qa-id="saveBtn"]').click()

      cy.get('[data-qa-id="login-dialouge"]').should('exist')
    })
  }
)
