describe('group creation', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    const user = {
      username: 'hmmmmm',
      password: 'thisisalongpassword',
      displayName: 'Hmmmmm',
      email: 'cypress@example.com'
    }

    cy.request('POST', 'http://localhost:3000/api/users', user)
    .then(res => {
      window.localStorage.setItem('loggedInGroupreader', JSON.stringify(res.body))
    })

    cy.visit('http://localhost:3000/groups')
  })

  it('is successful with proper parameters', () => {
    cy.get('#create-group-button').click()

    cy.get('#group-creation-title').type('The Test Book')
    cy.get('#group-creation-author').type('Mr. Test')
    cy.get('#group-creation-year').type('2021')
    cy.get('#group-creation-page-count').type('300')

    cy.get('#group-creation-submit-button').click()

    cy.contains('Schedule')
  })
})