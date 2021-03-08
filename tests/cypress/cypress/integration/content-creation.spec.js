describe('Hello world ', function(){
  context('Make a post', function(){
    it('Logs in', function(){

      cy.visit('wp-login.php');
      cy.wait(500);

      cy.get('input[name=log]').type(Cypress.env('AUTHOR_NAME'))
      cy.get('input[name=pwd]').type(Cypress.env('AUTHOR_PASS') + '{enter}')
      cy.wait(500);

      cy.visit('wp-admin/post-new.php');
      const d = new Date();
      const n = d.getTime();
      const quote = 'I have always been of opinion that a person who desires to be a Full Stack Developer should know either everything or nothing. Which do you know?';
      //const quote = 'To iterate is the rarest thing in the world. Most people maintain, that is all.';
      //const quote = "I don’t want to be at the mercy of my Kanban boards. I want to use them, to enjoy them, and to dominate them.";
      // const quote = "I am so clever that sometimes I don’t understand a single line of what I am coding.";

      const title = 'WebOpscar Wilde: ' + quote +  '(timestamp: ' + n + ')';
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
