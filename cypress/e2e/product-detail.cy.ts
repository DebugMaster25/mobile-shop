describe('Product Detail Page', () => {
  beforeEach(() => {
    // Visit a product detail page (assuming product ID exists)
    cy.visit('/');
    cy.get('.product-card').first().click();
  });

  it('should display product details', () => {
    cy.get('.product-detail').should('be.visible');
    cy.get('.product-detail-image img').should('be.visible');
    cy.get('.product-description h2').should('be.visible');
    cy.get('.product-detail-price').should('be.visible');
  });

  it('should display all required product specifications', () => {
    const requiredSpecs = [
      'CPU',
      'RAM',
      'OS',
      'Display',
      'Battery',
      'Camera',
      'Dimensions',
      'Weight',
    ];

    requiredSpecs.forEach((spec) => {
      cy.get('.specs-list').should('contain', spec);
    });
  });

  it('should display color selector with options', () => {
    cy.get('.option-group').contains('Color:').should('be.visible');
    cy.get('.option-buttons').should('be.visible');
    cy.get('.option-button').should('have.length.greaterThan', 0);
  });

  it('should display storage selector with options', () => {
    cy.get('.option-group').contains('Storage:').should('be.visible');
    cy.get('.option-buttons').last().should('be.visible');
    cy.get('.option-button').should('have.length.greaterThan', 0);
  });

  it('should select color option when clicked', () => {
    cy.get('.option-button').first().click();
    cy.get('.option-button.selected').should('exist');
  });

  it('should select storage option when clicked', () => {
    // Get storage buttons (last option group)
    cy.get('.option-group').last().within(() => {
      cy.get('.option-button').first().click();
      cy.get('.option-button.selected').should('exist');
    });
  });

  it('should have add to cart button', () => {
    cy.get('.add-to-cart-button').should('be.visible');
    cy.get('.add-to-cart-button').should('contain', 'Add to Cart');
  });

  it('should add product to cart when button is clicked', () => {
    // Ensure options are selected (they should be by default)
    cy.get('.option-button.selected').should('have.length.at.least', 2);
    
    // Click add to cart
    cy.get('.add-to-cart-button').click();
    
    // Verify button shows "Added!" or "Adding..."
    cy.get('.add-to-cart-button', { timeout: 5000 }).should(
      'satisfy',
      ($button) => {
        const text = $button.text();
        return text.includes('Added') || text.includes('Adding');
      }
    );
    
    // Verify cart count updates in header
    cy.get('.cart-count').should('be.visible');
  });

  it('should display two-column layout', () => {
    cy.get('.product-detail').should('be.visible');
    cy.get('.product-detail-image').should('be.visible');
    cy.get('.product-detail-info').should('be.visible');
  });

  it('should navigate back to product list via breadcrumbs', () => {
    cy.get('.breadcrumbs a').contains('Products').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('.product-grid').should('be.visible');
  });

  it('should navigate back to product list via logo', () => {
    cy.get('.header-logo').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('.product-grid').should('be.visible');
  });

  it('should show breadcrumbs with current page', () => {
    cy.get('.breadcrumbs').should('contain', 'Products');
    cy.get('.breadcrumbs').should('contain', 'Product Details');
  });
});

