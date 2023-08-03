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
        cy.fillMandatoryFieldsAndSubmit() //busca na pasta commands.js as infos para preencher os campos

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube') //selecionar o campo youtube da lista
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria') //seleciona o campo mentoria da lista
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1) //seleciona o primeiro valor da lista, que no caso é a opçõa blog
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it.only('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3) //verifica que tem 3 radios buttos
        .each(function($radio){ //pega os 3 radios
            cy.wrap($radio).check() //empacota cada um dos radios, e da um check em cada um dos radios
            cy.wrap($radio).should('be.checked') //verifica se todos foram marcados
        })
    })


    
  })