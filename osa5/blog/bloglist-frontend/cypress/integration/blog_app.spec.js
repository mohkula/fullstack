describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Testaaja',
      username: 'tester',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to the application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('vääräsalasana')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'salainen' })
      cy.contains('Testaaja logged in')

    })

    it('A blog can be created', function() {

      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypressurl')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')




    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress rules',
          author: 'Cypress',
          url: 'CypressUrl',
          likes: 0
        })
      })


      it('A blog can be liked', function() {

        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')



      })

    })
  })

})