describe('the login form', () => {
  before(() => {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('properly supports registering', () => {
    cy.get('#homepage-login-button').click()
    cy.contains('Username')
    cy.contains('Password')

    cy.get('#register-tab').click()

    cy.get('#register-username').type('testuser')
    cy.get('#register-display-name').type('Test User')
    cy.get('#register-password').type('foeiwqprcoiwemoqipwem')
    cy.get('#register-email').type('cypress@example.com')

    cy.get('#register-submit-button').click()

    cy.get('#group-list-link').click()
    cy.get('#create-group-button').should('exist')
  })

  it('supports logging into an existing account', () => {
    cy.get('#group-list-link').click()

    cy.get('#create-group-button').should('not.exist')

    cy.get('#login-button').click()
    cy.get('#login-username').type('testuser')
    cy.get('#login-password').type('foeiwqprcoiwemoqipwem')
    cy.get('#login-submit-button').click()

    cy.get('#create-group-button').should('exist')
  })
})