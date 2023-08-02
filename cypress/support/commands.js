Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('André Leonardo')
    cy.get('#lastName').type('Althoff')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})
