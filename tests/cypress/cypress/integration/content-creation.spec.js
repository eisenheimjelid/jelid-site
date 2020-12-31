describe('Hello world ', function(){
  context('Make a post', function(){
    it('Logs in', function(){

      cy.visit('wp-login.php');
      cy.wait(500);

      cy.get('input[name=log]').type(Cypress.env('AUTHOR_NAME'))
      cy.get('input[name=pwd]').type(Cypress.env('AUTHOR_PASS') + '{enter}')
      cy.wait(500);

      cy.visit('wp-admin/post-new.php');
      var d = new Date();
      var n = d.getTime();
      const title = 'Hello World ' + n;
      cy.get('textarea#post-title-0').type(title, {force: true})
      cy.get('.editor-post-publish-button__button').click();
      cy.wait(500);
      cy.get('.editor-post-publish-panel .editor-post-publish-button__button').click();

      cy.get('.post-publish-panel__postpublish-buttons a').click();

      // #root seems like a decent proxy for "rendered through React"
      cy.get('#root h1').contains(title);

      cy.visit('/');
      cy.get('#root article:first-of-type h1').contains(title);
    })
  })
})
