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

      // replace the below selectors with the actual ones used in the app
      cy.get('#titleInput').type('A new blog by Matti');
      cy.get('#authorInput').type('Matti Luukkainen');
      cy.get('#urlInput').type('http://blogbymatti.com');

      cy.get('button').contains('create').click();

      // replace #blog-list with the actual selector for the blog list element
      cy.get('div').should('contain', 'A new blog by Matti');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click();

        // replace the below selectors with the actual ones used in the app
        cy.get('#titleInput').type('A blog to be liked');
        cy.get('#authorInput').type('Matti Luukkainen');
        cy.get('#urlInput').type('http://likableblogbymatti.com');

        cy.get('button').contains('create').click();
      });

      it('User can like a blog', function () {
        cy.contains('view').click();

        // replace #like-button with the actual selector for the like button
        cy.get('button').contains('like').click();

        // replace #likes-count with the actual selector for the likes count element
        cy.get('div').contains('likes').should('contain', '1');
      });
    });
  });
});
