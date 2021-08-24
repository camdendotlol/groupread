describe('groupread', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('opens the homepage', () => {
    cy.contains('Read books with your friends.')
  })
})