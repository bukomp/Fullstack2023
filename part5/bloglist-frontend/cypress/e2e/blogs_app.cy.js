describe('Blog app', function () {
  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen',
  };
  const secondUser = {
    name: 'John Doe',
    username: 'johndoe',
    password: 'secret',
  };

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    cy.request('POST', 'http://localhost:3001/api/user/', user);
    cy.request('POST', 'http://localhost:3001/api/user/', secondUser);

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

      it('Only creator can see the delete button', function () {
        cy.contains('view').click();
        cy.get('button').contains('remove');

        cy.get('button').contains('Logout').click();

        cy.get('#usernameInput').type(secondUser.username);
        cy.get('#passwordInput').type(secondUser.password);
        cy.get('#login-button').click();

        cy.contains('view').click();
        cy.get('button').contains('remove').click();
        cy.get('.error').contains('Deleting blog failed. Please try again.');
      });
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        ['First', 'Second', 'Third'].forEach((title, i) => {
          cy.contains('new blog').click();

          // replace the below selectors with the actual ones used in the app
          cy.get('#titleInput').type(`${title} blog`);
          cy.get('#authorInput').type('Matti Luukkainen');
          cy.get('#urlInput').type(
            `http://${title.toLowerCase()}blogbymatti.com`
          );

          cy.get('button').contains('create').click();

          // Open the blog details
          cy.contains(`${title} blog`).parent().as('blogList');
          cy.get('@blogList').contains('view').click();

          // Like the blog i+1 times
          for (let j = 0; j < i + 1; j++) {
            cy.get('@blogList').contains('like').click();

            // Wait for the likes to update
            cy.get('@blogList').contains(`likes ${j + 1}`);
          }

          // Close the blog details
          cy.get('@blogList').contains('hide').click();
        });
      });

      it('Blogs are ordered according to likes', function () {
        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0]).should('contain', 'Third blog');
          cy.wrap(blogs[1]).should('contain', 'Second blog');
          cy.wrap(blogs[2]).should('contain', 'First blog');
        });
      });
    });
  });
});
