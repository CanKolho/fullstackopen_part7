describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const firstUser = {
      username: 'firstUser',
      name: 'dev',
      password: 'password',
    }

    const secondUser = {
      username: 'secondUser',
      name: 'stud',
      password: 'password',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, firstUser)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-btn').should('exist')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('firstUser')
      cy.get('#password').type('password')
      cy.get('#login-btn').click()

      cy.contains('dev logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('firstUser')
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
      cy.login({ username: 'firstUser', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('#title').type('some blog about something')
      cy.get('#author').type('blogger')
      cy.get('#url').type('www.newblog.com')

      cy.get('#create-btn').click()

      cy.contains('some blog about something - blogger')

      cy.get('.success')
        .should(
          'contain',
          "a new blog 'some blog about something' by blogger added",
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'likes are important',
        author: 'tester',
        url: 'www.likes.com',
      })

      cy.contains('likes are important - tester')
        .parent()
        .find('button')
        .as('view-btn')
      cy.get('@view-btn').click()

      cy.get('#like-btn').click()

      cy.contains('Likes 1')
    })

    it('A blog can be deleted', function () {
      cy.createBlog({
        title: 'delete me',
        author: 'tester',
        url: 'www.delete.com',
      })

      cy.contains('delete me - tester').parent().find('button').as('view-btn')
      cy.get('@view-btn').click()

      cy.get('#remove-btn').click()

      cy.get('.success')
        .should('contain', 'blog deleted successfully!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('delete me tester').should('not.exist')
    })

    it('Only the user that has added the blog can see `remove`-button', function () {
      cy.createBlog({
        title: 'can you see me',
        author: 'tester',
        url: 'www.canyouseeme.com',
      })

      cy.contains('can you see me - tester')
        .parent()
        .find('button')
        .as('view-btn')
      cy.get('@view-btn').click()
      cy.get('#remove-btn').should('exist')

      cy.get('#logout-btn').click()
      cy.contains('log in to application')

      cy.login({ username: 'secondUser', password: 'password' })

      cy.contains('can you see me - tester')
        .parent()
        .find('button')
        .as('view-btn')
      cy.get('@view-btn').click()
      cy.get('#remove-btn').should('not.exist')
    })

    it('Blogs are ordered by likes in descending order', function () {
      cy.createBlog({
        title: 'first blog',
        author: 'first',
        url: 'www.first.com',
      })
      cy.createBlog({
        title: 'second blog',
        author: 'second',
        url: 'www.second.com',
      })
      cy.createBlog({
        title: 'third blog',
        author: 'third',
        url: 'www.third.com',
      })

      //First Blog
      cy.contains('first blog - first').parent().find('button').click() //view-button
      cy.get('#like-btn').click()
      cy.contains('first blog - first').parent().find('button').click() //hide-button

      //Second Blog
      cy.contains('second blog - second').parent().find('button').click() //view-button
      cy.contains('Likes 0').parent().find('button').click().wait(500).click()
      cy.contains('second blog - second').parent().find('button').click() //hide-button

      //Third Blog
      cy.contains('third blog - third').parent().find('button').click() //view-button
      cy.contains('Likes 0')
        .parent()
        .find('button')
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
      cy.contains('third blog - third').parent().find('button').click() //hide-button

      cy.get('.blog').eq(0).should('contain', 'third blog') //Most likes (3)
      cy.get('.blog').eq(1).should('contain', 'second blog') //Second most likes (2)
      cy.get('.blog').eq(2).should('contain', 'first blog') //Least likes (1)
    })
  })
})
