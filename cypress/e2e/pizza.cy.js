describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3002/pizza')
  })
})

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3002')
    })
 })



//  can add text to the box-- data-cy="form-inputs-name" 


it('can fill out Order', () => {
  const newItem = 'SweetPotato Bolosky'

  cy.visit('http://localhost:3002/pizza')

  cy.get('[data-cy="form-inputs-name"]').type(`${newItem}`)
    .should('be.visible')


// Can select multiple toppings-- data-cy="form-check-toppings" 1-7

cy.get('[data-cy="form-check-toppings1"]').click()
cy.get('[data-cy="form-check-toppings2"]').click()
cy.get('[data-cy="form-check-toppings3"]').click()
cy.get('[data-cy="form-check-toppings4"]').click()
cy.get('[data-cy="form-check-toppings5"]').click()
cy.get('[data-cy="form-check-toppings6"]').click()
cy.get('[data-cy="form-check-toppings7"]').click()


// can submit form-- data-cy="submit"

  cy.get('[data-cy="submit"]').click()
  
    
})