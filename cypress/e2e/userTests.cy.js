describe('Users', () => {

  beforeEach(() => {
    cy.wait(1000);
    cy.visit('http://localhost:3000/')
  });

  it('gets all users', () => {
    cy.get('table').find('tr').should('have.length', 25);
  });

  it('creates a new user', () => {
    cy.get('button').contains('Create new').click();
    cy.get('input[name="employee_name"]').type('test');
    cy.get('input[name="employee_salary"]').type('1000');
    cy.get('input[name="employee_age"]').type('20');
    cy.wait(1000);
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.get('table').find('tr').should('have.length', 26);

    cy.get('table').find('tr').eq(25).find('td').eq(1).should('have.text', 'test');
    cy.get('table').find('tr').eq(25).find('td').eq(2).should('have.text', '1000');
    cy.get('table').find('tr').eq(25).find('td').eq(3).should('have.text', '20');
  });

  it('updates the user', () => {
    cy.get('table').find('tr[id=4]').find('td').find('button').contains('Edit').click();
    cy.wait(1000);
    cy.get('input[name="employee_name"]').clear().type('test');
    cy.get('input[name="employee_salary"]').clear().type('1000');
    cy.get('input[name="employee_age"]').clear().type('20');
    cy.get('button').contains('Update').click();
    cy.wait(1000);

    cy.get('table').find('tr[id=4]').find('td').eq(1).should('have.text', 'test');
    cy.get('table').find('tr[id=4]').find('td').eq(2).should('have.text', '1000');
    cy.get('table').find('tr[id=4]').find('td').eq(3).should('have.text', '20');
  });

  it('deletes the user', () => {
    cy.get('table').find('tr[id=4]').find('td').find('button').contains('Delete').click();
    cy.wait(1000);
    cy.get('table').find('tr').should('have.length', 24);
  });

})