describe('Blog app', function () {
  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen',
  };

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    cy.request('POST', 'http://localhost:3001/api/user/', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
  });

  it('succeeds with correct credentials', function () {
    cy.get('#usernameInput').type(user.username);
    cy.get('#passwordInput').type(user.password);
    cy.get('#login-button').click();

    cy.get('p').should('contain', 'Matti Luukkainen logged in');
  });

  it('fails with wrong credentials', function () {
    cy.get('#usernameInput').type(user.username);
    cy.get('#passwordInput').type('wrongpassword');
    cy.get('#login-button').click();

    cy.get('.error').should('contain', 'invalid username or password');
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#usernameInput').type(user.username);
      cy.get('#passwordInput').type(user.password);
      cy.get('#login-button').click();
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();

      cy.get('#titleInput').type('A new blog by Matti');
      cy.get('#authorInput').type('Matti Luukkainen');
      cy.get('#urlInput').type('http://blogbymatti.com');

      cy.get('button').contains('create').click();

      cy.get('div').should('contain', 'A new blog by Matti');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click();

        cy.get('#titleInput').type('A blog to be liked');
        cy.get('#authorInput').type('Matti Luukkainen');
        cy.get('#urlInput').type('http://likableblogbymatti.com');

        cy.get('button').contains('create').click();
      });

      it('User can like a blog', function () {
        cy.contains('view').click();

        cy.get('button').contains('like').click();

        cy.get('div').contains('likes').should('contain', '1');
      });

      it('User who created a blog can delete it', function () {
        cy.contains('view').click();

        cy.get('button').contains('remove').click();

        cy.get('div').should('not.contain', 'A blog to be liked');
      });
    });
  });
});
