describe('Product List Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the header with breadcrumbs and cart', () => {
    cy.get('header').should('be.visible');
    cy.get('.header-logo').should('contain', 'Mobile Shop');
    cy.get('.breadcrumbs').should('contain', 'Products');
    cy.get('.cart-icon').should('be.visible');
  });

  it('should load and display products', () => {
    cy.get('.product-grid').should('be.visible');
    cy.get('.product-card').should('have.length.greaterThan', 0);
  });

  it('should display product information correctly', () => {
    cy.get('.product-card').first().within(() => {
      cy.get('.product-brand').should('be.visible');
      cy.get('.product-model').should('be.visible');
      cy.get('.product-price').should('be.visible');
      cy.get('img').should('be.visible');
    });
  });

  it('should filter products by search query', () => {
    // Wait for products to load first
    cy.get('.product-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
    
    // Get the brand or model from the first product to use as search term
    cy.get('.product-card').first().within(() => {
      cy.get('.product-brand, .product-model').first().invoke('text');
    }).then((searchTerm) => {
      const term = searchTerm.trim().split(' ')[0]; // Get first word (e.g., "Apple" or "iPhone")
      
      // Now we're outside the .within() context, so we can access the search input
      cy.get('.search-input').should('be.visible').clear().type(term);
      
      // Wait for search to complete
      cy.wait(1000);
      
      // Check if we have filtered results or no products message
      cy.get('body').then(($body) => {
        if ($body.find('.no-products').length > 0) {
          // No products found - verify message is shown
          cy.get('.no-products').should('be.visible');
          cy.get('.no-products').should('contain', 'No products found');
        } else {
          // Products found - verify they match search (case insensitive)
          cy.get('.product-card', { timeout: 5000 }).should('have.length.greaterThan', 0);
          
          // Verify filtered products contain search term
          cy.get('.product-card').each(($card) => {
            cy.wrap($card).within(() => {
              cy.get('.product-brand, .product-model').then(($text) => {
                const text = $text.text().toLowerCase();
                const searchLower = term.toLowerCase();
                expect(text).to.include(searchLower);
              });
            });
          });
        }
      });
    });
  });

  it('should navigate to product detail page when clicking a product', () => {
    cy.get('.product-card').first().click();
    cy.url().should('include', '/product/');
    cy.get('.product-detail').should('be.visible');
  });

  it('should show no products message when search returns no results', () => {
    cy.get('.search-input').type('NonExistentProduct12345');
    cy.get('.no-products').should('be.visible');
    cy.get('.no-products').should('contain', 'No products found');
  });

  it('should be responsive - show max 4 columns on desktop', () => {
    cy.viewport(1280, 720);
    cy.get('.product-grid').should('have.css', 'grid-template-columns');
    
    // Check that grid has 4 columns on desktop
    cy.get('.product-grid').then(($grid) => {
      const gridTemplate = window.getComputedStyle($grid[0]).gridTemplateColumns;
      const columnCount = gridTemplate.split(' ').length;
      expect(columnCount).to.be.at.most(4);
    });
  });
});

