describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'developer',
      name: 'dev',
      password: 'password',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('developer')
      cy.get('#password').type('password')
      cy.get('#login-btn').click()

      cy.contains('dev logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('developer')
      cy.get('#password').type('pass')
      cy.get('#login-btn').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'dev logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'developer', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('#title').type('some blog about something')
      cy.get('#author').type('blogger')
      cy.get('#url').type('www.newblog.com')

      cy.get('#create-btn').click()

      cy.contains('some blog about something')

      cy.get('.success')
        .should(
          'contain',
          "a new blog 'some blog about something' by blogger added",
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('A blog can be liked', function () {
      cy.contains('create new blog').click()

      cy.get('#title').type('some blog about something')
      cy.get('#author').type('blogger')
      cy.get('#url').type('www.newblog.com')

      cy.get('#create-btn').click()

      cy.contains('some blog about something')

      cy.get('.success')
        .should(
          'contain',
          "a new blog 'some blog about something' by blogger added",
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})
