document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.querySelector('.header-container');
    const searchBar = document.querySelector('.search-bar');
    const cartIcon = document.querySelector('.cart-icon');
    const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerContainer.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
        searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                // In a real application, this would redirect to search results
                console.log('Searching for:', searchTerm);
                alert(`Searching for: ${searchTerm}`);
                this.value = '';
            }
        }
    });
        let cartItems = 0;
    
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Cart clicked');
        alert(`Cart contains ${cartItems} items`);
    });
        window.addToCart = function() {
        cartItems++;
        updateCartCount();
    };
        function updateCartCount() {
        const existingCount = document.querySelector('.cart-count');
        if (existingCount) {
            existingCount.remove();
        }
        
        if (cartItems > 0) {
            const countBadge = document.createElement('span');
            countBadge.className = 'cart-count';
            countBadge.textContent = cartItems;
            cartIcon.appendChild(countBadge);
        }
    }
        window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            headerContainer.classList.add('sticky');
        } else {
            headerContainer.classList.remove('sticky');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.header-container').offsetHeight;
            const offsetPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            if (target) {
                if (target.startsWith('#')) {
                    smoothScroll(target);
                } else {
                    window.location.href = target;
                }
            }
        });
    });
    const shopNowBtn = document.querySelector('.hero-section .btn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#products');
                        this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    }

    const clickableLinks = document.querySelectorAll('a[href]');
    clickableLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            
            if (target.startsWith('#')) {
                e.preventDefault();
                smoothScroll(target);
            }
        });
    });

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            this.querySelector('.quick-view').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
            this.querySelector('.quick-view').style.opacity = '0';
        });

        card.addEventListener('click', function() {
            const productTitle = this.querySelector('h3').textContent;
            console.log(`Product clicked: ${productTitle}`);
        });
    });

    const quickViewLinks = document.querySelectorAll('.quick-view a');
    
    quickViewLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); 
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-info p').textContent;
            const discountLabel = productCard.querySelector('.discount-label')?.textContent || '';
            const imageSrc = productCard.querySelector('img').src;
            
            showQuickViewModal({
                name: productName,
                price: productPrice,
                discount: discountLabel,
                image: imageSrc
            });
        });
    });

    function showQuickViewModal(product) {
        const existingModal = document.querySelector('.quick-view-modal');
        if (existingModal) existingModal.remove();
        
        const modalHTML = `
            <div class="quick-view-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <div class="modal-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.discount ? `<span class="discount-label">${product.discount}</span>` : ''}
                    </div>
                    <div class="modal-info">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                        <div class="quantity-selector">
                            <button class="decrement">-</button>
                            <input type="number" value="1" min="1">
                            <button class="increment">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.quick-view-modal');
        const closeBtn = modal.querySelector('.close-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const incrementBtn = modal.querySelector('.increment');
        const decrementBtn = modal.querySelector('.decrement');
        const quantityInput = modal.querySelector('input');
        const addToCartBtn = modal.querySelector('.add-to-cart');
        
        function closeModal() {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        incrementBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
        
        decrementBtn.addEventListener('click', () => {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
        
        addToCartBtn.addEventListener('click', function() {
            const productToAdd = {
                name: product.name,
                price: product.price,
                quantity: parseInt(quantityInput.value),
                image: product.image
            };
            
            console.log('Added to cart:', productToAdd);
            alert(`${productToAdd.quantity} ${product.name} added to cart!`);
            closeModal();
        });
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
    const style = document.createElement('style');
    style.textContent = `
        .quick-view {
            transition: opacity 0.3s ease;
            opacity: 0;
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
        }
        .quick-view a {
            background: rgba(255,255,255,0.9);
            padding: 8px 15px;
            border-radius: 20px;
            color: #333;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
        }
        .product-card {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
        }
        .modal-content {
            position: relative;
            background: white;
            width: 80%;
            max-width: 800px;
            display: flex;
            border-radius: 10px;
            overflow: hidden;
            z-index: 1001;
        }
        .modal-image {
            flex: 1;
            position: relative;
        }
        .modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .modal-info {
            flex: 1;
            padding: 30px;
        }
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            z-index: 1002;
        }
        .quantity-selector {
            display: flex;
            margin: 20px 0;
        }
        .quantity-selector input {
            width: 50px;
            text-align: center;
            margin: 0 5px;
        }
        .add-to-cart {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
        }
    `;
    document.head.appendChild(style);


});
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSection = document.querySelector('.testimonials');
    const carousel = testimonialsSection.querySelector('.carousel');
    const testimonials = carousel.querySelectorAll('.testimonial');
    let currentIndex = 0;
    let autoSlideInterval;

    function initializeTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = index === 0 ? 'block' : 'none';
            testimonial.style.opacity = index === 0 ? '1' : '0';
            testimonial.style.transition = 'opacity 0.5s ease';
        });

        if (testimonials.length > 1) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'testimonial-dots';
            
            testimonials.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'dot';
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToTestimonial(index));
                dotsContainer.appendChild(dot);
            });
            
            testimonialsSection.appendChild(dotsContainer);
            
            const prevArrow = document.createElement('button');
            prevArrow.className = 'testimonial-arrow prev';
            prevArrow.innerHTML = '&lt;';
            prevArrow.addEventListener('click', () => navigateTestimonials(-1));
            
            const nextArrow = document.createElement('button');
            nextArrow.className = 'testimonial-arrow next';
            nextArrow.innerHTML = '&gt;';
            nextArrow.addEventListener('click', () => navigateTestimonials(1));
            
            carousel.insertAdjacentElement('beforebegin', prevArrow);
            carousel.insertAdjacentElement('afterend', nextArrow);
        }

        if (testimonials.length > 1) {
            startAutoSlide();
            
            carousel.addEventListener('mouseenter', pauseAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
        }
    }

    function navigateTestimonials(direction) {
        const newIndex = (currentIndex + direction + testimonials.length) % testimonials.length;
        goToTestimonial(newIndex);
    }

    function goToTestimonial(index) {
        if (index === currentIndex) return;
        
        testimonials[currentIndex].style.opacity = '0';
        
        setTimeout(() => {
            testimonials[currentIndex].style.display = 'none';
            
            testimonials[index].style.display = 'block';
            setTimeout(() => {
                testimonials[index].style.opacity = '1';
            }, 10);
            
            currentIndex = index;
            
            updateActiveDot();
            
            resetAutoSlide();
        }, 500);    }

    function updateActiveDot() {
        const dots = testimonialsSection.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function startAutoSlide() {
        if (testimonials.length <= 1) return;
        autoSlideInterval = setInterval(() => {
            navigateTestimonials(1);
        }, 5000);    }

    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }

    const style = document.createElement('style');
    style.textContent = `
        .testimonials {
            position: relative;
            padding: 40px 20px;
            text-align: center;
            background:rgb(201, 180, 180);
        }
        .carousel {
            position: relative;
            max-width: 800px;
            margin: 0 auto;
            min-height: 300px;
        }
        .testimonial {
            text-align: center;
            padding: 20px;
        }
        .testimonial img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 15px;
            display: block;
            border: 3px solid #fff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .testimonial p {
            font-style: italic;
            font-size: 1.1em;
            margin-bottom: 15px;
        }
        .testimonial h3 {
            color: #333;
            margin-top: 10px;
        }
        .testimonial-dots {
            text-align: center;
            margin-top: 20px;
        }
        .dot {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin: 0 5px;
            border-radius: 50%;
            background-color: #bbb;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .dot.active {
            background-color: #333;
        }
        .testimonial-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s;
        }
        .testimonial-arrow:hover {
            background: rgba(0,0,0,0.8);
        }
        .testimonial-arrow.prev {
            left: 10px;
        }
        .testimonial-arrow.next {
            right: 10px;
        }
        @media (max-width: 600px) {
            .testimonial-arrow {
                width: 30px;
                height: 30px;
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(style);

    initializeTestimonials();
});
document.addEventListener('DOMContentLoaded', function() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3); // 3 days from now
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
         
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown-timer').innerHTML = "Offer has expired!";
        }
    }
    
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
    
    const shopNowBtn = document.querySelector('.special-offer .offer-content .btn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const productsSection = document.querySelector('#products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
            console.log('Navigating to discounted products');
        });
    }
    
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                console.log('Subscribing email:', email);
                
                showSubscriptionSuccess(this, email);
                
                emailInput.value = '';
            } else {
                showFormError(this, 'Please enter a valid email address');
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showSubscriptionSuccess(form, email) {
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.textContent = `Thank you! A confirmation has been sent to ${email}`;
        form.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    function showFormError(form, message) {
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-message error';
        errorMessage.textContent = message;
        form.insertBefore(errorMessage, form.firstChild);
        
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    }
    
});
document.addEventListener('DOMContentLoaded', function() {
    const ctaBtn = document.querySelector('.cta-btn');
    
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            if (target.startsWith('#')) {
                const targetSection = document.querySelector(target);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            console.log('CTA button clicked - navigating to:', target);
        });
        
        ctaBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        ctaBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    }

    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            if (target.startsWith('#')) {
                const targetSection = document.querySelector(target);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    const socialLinks = document.querySelectorAll('.social-media a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.querySelector('img').alt;
            console.log('Social media link clicked:', platform);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        /* CTA Button Styles */
        .cta-btn {
            transition: all 0.3s ease;
            display: inline-block;
            padding: 12px 30px;
            background-color: #ff6b6b;
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-weight: bold;
            margin-top: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .cta-btn:hover {
            background-color: #ff5252;
        }
        
        /* Footer Link Styles */
        .footer-links a {
            transition: color 0.3s ease;
            color: #ddd;
            text-decoration: none;
        }
        
        .footer-links a:hover {
            color: white;
            text-decoration: underline;
        }
        
        /* Social Media Icon Styles */
        .social-media img {
            width: 40px;
            height: 40px;
            margin-right: 15px;
            transition: transform 0.3s ease;
            border-radius: 50%;
        }
        
        .social-media img:hover {
            transform: scale(1.1);
        }
        
        /* Payment Method Styles */
        .payment-methods img {
            height: 30px;
            margin-right: 10px;
            filter: grayscale(30%);
            transition: filter 0.3s ease;
        }
        
        .payment-methods img:hover {
            filter: grayscale(0%);
        }
    `;
    document.head.appendChild(style);

    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = copyrightYear.textContent.replace('2025', currentYear);
    }
});
