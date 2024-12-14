describe('API de Controle de Ponto - Consulta de Ponto de Funcionário', () => {

  //ID do funcionário para o qual exatamente queremos testar o metódo GET dentro do endpoint da API.
  //Poderíamos para esse caso fazer apenas o apontamento para o cypress.env.json, 
  //exmeplo: const funcionarioId = Cypress.env('funcionarioId');
  //Contudo queremos deixar a orientação fixa.

  const funcionarioId = 1234; 
  it('Deve consultar os registros de ponto de um funcionário', () => {

    //Chamadada para a URL da API com a finalidade de consultar os registros de ponto.
    //Metódo GET elencado para a URL da API com configuração apontada para varariáveis de ambientes contidas no arquivo
    //cypress.env.json a título de configuração e apontamento para qual endpoint deverá ser acessado, com passagem de token no header.

    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/api/ponto/${funcionarioId}`, 
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`, 
      },
    }).then((response) => {

      //Validações: A resposta de ve ser igual a 200 por se tratar de um GET. Valida se a resposta é um array e verifica se existe 
      //pelo menos um registro dentro do corpo (body).

      expect(response.status).to.eq(200); 
      expect(response.body).to.be.an('array'); 
      expect(response.body.length).to.be.greaterThan(0); 
      response.body.forEach((registro) => {

      //Valida que cada registro tenha as propriedades de exemplo abaixo esperadas. Outras propriedades poderão existir a depender
      //de como foi cirada a API.

        expect(registro).to.have.property('id');
        expect(registro).to.have.property('funcionarioId', funcionarioId);
        expect(registro).to.have.property('tipoPonto').that.is.oneOf(['entrada', 'saída']);
        expect(registro).to.have.property('dataHora');
      });
    });
  });
});
