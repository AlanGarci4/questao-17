describe('API de Controle de Ponto - Registro de Ponto de Entrada', () => {

  //Chama a varivável pré determinada no arquivo cypress.env.json

  let funcionarioId;

  before(() => {
    //Recupera o ID do funcionário de um endpoint, pega por meio do metódo GET elencado para a URL da API que se refere nesse caso 
    //ao apontamento para funcionários, /funcionarios, posteriormente passando as varariáveis de ambientes contidas no arquivo
    //cypress.env.json a título de configuração e apontamento para qual endpoint deverá ser acessado, com passagem de token no header
    //e pegarmos o rimeiro funcionário do corpo (Body) do json da API.

    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/api/funcionarios`,
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      funcionarioId = response.body[0].id; 
    });
  });

  it('Deve registrar o ponto de entrada de um funcionário', () => {
   
     //Comportamento similar aos anteriores, com a criação dos dados para pont de entrada, com a criação do POST validações com 
     //status: 201, como esperado e registro do ponto.

    const pontoEntrada = {
      funcionarioId: funcionarioId, 
      tipoPonto: 'entrada',
      dataHora: new Date().toISOString(),
    };

    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseUrl')}/api/ponto/entrada`,
      body: pontoEntrada,
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.funcionarioId).to.eq(funcionarioId);
      expect(response.body.tipoPonto).to.eq('entrada');
      expect(response.body.dataHora).to.eq(pontoEntrada.dataHora);
    });
  });
});
