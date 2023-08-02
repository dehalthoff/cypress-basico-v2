/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){        
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //busca o titulo e verifica se o titulo ta correto
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, '
        cy.get('#firstName').type('André Leonardo')
        cy.get('#lastName').type('Althoff')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0}) //usando o delay = 0, o teste é feito mais rapido quando for testos longos
        cy.contains('button', 'Enviar').click() // cy.contains pega o que ta escrito no botão

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('André Leonardo')
        cy.get('#lastName').type('Althoff')
        cy.get('#email').type('emaSil@email,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor nao-numerico', function(){
        cy.get('#phone')
        .type('abdcdefgh')
        .should('have.value', '')
    })

    it('xibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('André Leonardo')
        cy.get('#lastName').type('Althoff')
        cy.get('#email').type('emaSil@email.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('André Leonardo')
          .should('have.value', 'André Leonardo')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Althoff')
          .should('have.value', 'Althoff')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('emaSil@email.com')
          .should('have.value', 'emaSil@email.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('1234567890')
          .should('have.value', '1234567890')
          .clear()
          .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })


  })