describe('there should be random words from the api', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('check for random words', () => {
    // check if we are getting random words or not
    cy.request('https://canarytype.azurewebsites.net/api/Canary/RandomWords').then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('should be able to type words', () => {
    cy.get('[data-qa-id="textarea"]').click()
    cy.get('[data-qa-id="textarea"]').type('random words')

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(10000)

    // after waiting 10 seconds, the timer should become zero
    cy.get('[data-qa-id="timer"]').should('contain', 0)

    // button should be available to save results
    cy.get('[data-qa-id="saveBtn"]').click()
  })
})
