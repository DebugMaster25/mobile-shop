describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display cart icon in header', () => {
    cy.get('.cart-icon').should('be.visible');
    cy.get('.cart-icon-symbol').should('be.visible');
  });

  it('should show cart count after adding product', () => {
    // Navigate to product detail
    cy.get('.product-card').first().click();
    
    // Wait for product to load
    cy.get('.product-detail', { timeout: 5000 }).should('be.visible');
    
    // Ensure options are selected
    cy.get('.option-button.selected').should('have.length.at.least', 2);
    
    // Add to cart
    cy.get('.add-to-cart-button').click();
    
    // Verify cart count appears
    cy.get('.cart-count', { timeout: 5000 }).should('be.visible');
    cy.get('.cart-count').should('not.contain', '0');
  });

  it('should persist cart count across page navigation', () => {
    // Add product to cart
    cy.get('.product-card').first().click();
    cy.get('.product-detail', { timeout: 5000 }).should('be.visible');
    cy.get('.option-button.selected').should('have.length.at.least', 2);
    cy.get('.add-to-cart-button').click();
    
    // Get cart count
    cy.get('.cart-count', { timeout: 5000 }).then(($count) => {
      const count = $count.text();
      
      // Navigate back
      cy.get('.header-logo').click();
      
      // Verify count persists
      cy.get('.cart-count').should('contain', count);
    });
  });

  it('should update cart count when adding multiple products', () => {
    // Add first product
    cy.get('.product-card').first().click();
    cy.get('.product-detail', { timeout: 5000 }).should('be.visible');
    cy.get('.option-button.selected').should('have.length.at.least', 2);
    cy.get('.add-to-cart-button').click();
    
    cy.get('.cart-count', { timeout: 5000 }).then(($firstCount) => {
      const firstCount = parseInt($firstCount.text());
      
      // Navigate back and add another
      cy.get('.header-logo').click();
      cy.get('.product-card').eq(1).click();
      cy.get('.product-detail', { timeout: 5000 }).should('be.visible');
      cy.get('.option-button.selected').should('have.length.at.least', 2);
      cy.get('.add-to-cart-button').click();
      
      // Verify count increased
      cy.get('.cart-count', { timeout: 5000 }).should(($newCount) => {
        const newCount = parseInt($newCount.text());
        expect(newCount).to.be.greaterThan(firstCount);
      });
    });
  });
});

