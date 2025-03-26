document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-navigation');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('mobile-menu-open');
      });
    }
    
    // Search toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchModal = document.getElementById('SearchModal');
    
    if (searchToggle && searchModal) {
      searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchModal.classList.add('active');
        document.getElementById('SearchInput').focus();
      });
      
      const searchClose = searchModal.querySelector('.search-modal__close');
      searchClose.addEventListener('click', function() {
        searchModal.classList.remove('active');
      });
    }
    
    // Cart toggle
    const cartToggle = document.querySelector('.cart-toggle');
    const cartDrawer = document.getElementById('CartDrawer');
    
    if (cartToggle && cartDrawer) {
      cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        cartDrawer.classList.add('active');
      });
      
      const cartClose = cartDrawer.querySelector('.cart-drawer__close');
      cartClose.addEventListener('click', function() {
        cartDrawer.classList.remove('active');
      });
    }
    
    // Product swatches
    document.querySelectorAll('.product-card__swatch').forEach(swatch => {
      swatch.addEventListener('click', function() {
        const variantId = this.dataset.variantId;
        const form = this.closest('.product-card').querySelector('.product-card__form');
        
        if (form) {
          form.querySelector('input[name="id"]').value = variantId;
        }
      });
    });
    
    // Quick view
    document.querySelectorAll('[data-quick-view]').forEach(button => {
      button.addEventListener('click', function() {
        const productHandle = this.dataset.quickView;
        const quickViewModal = document.getElementById('QuickView');
        
        if (quickViewModal) {
          fetch(`/products/${productHandle}?view=quick-view`)
            .then(response => response.text())
            .then(html => {
              quickViewModal.querySelector('.quick-view-modal__content').innerHTML = html;
              quickViewModal.classList.add('active');
            })
            .catch(error => console.error('Error:', error));
        }
      });
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
        }
      });
    });
    
    // Sticky header
    if (document.querySelector('.header') && theme.settings.stickyHeader) {
      const header = document.querySelector('.header');
      const headerHeight = header.offsetHeight;
      let lastScrollPosition = 0;
      
      window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > headerHeight) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }
        
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > headerHeight) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
        
        lastScrollPosition = currentScrollPosition;
      });
    }
  });