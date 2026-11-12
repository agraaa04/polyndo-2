// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
    hamburgers.forEach((bar, index) => {
        if (mobileMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translateY(10px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const navbarHeight = document.querySelector("#navbar").offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add delay for staggered animation
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });
});

// Hero Animation on Load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Product Card Interactions
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature Card Interactions
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'rotate(5deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
        }
    });
});

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Observe stats and trigger counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.classList.contains('animated')) {
                statValue.classList.add('animated');
                const targetValue = parseInt(statValue.textContent);
                animateCounter(statValue, targetValue);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Button Click Effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('PolyElast Website Loaded Successfully!');

// Dynamic Product Grid (Auto load images from src)
document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    const productCount = 12; // misalnya kamu punya produk1 hingga produk12
    for (let i = 1; i <= productCount; i++) {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card', 'scroll-reveal');

      productCard.innerHTML = `
        <div class="product-image" style="background-image: url('src/produk${i}.png');"></div>
        <div class="product-content">
          <h3 class="product-name">Produk ${i}</h3>
          <p class="product-category">Polyurethane</p>
        </div>
      `;
      productGrid.appendChild(productCard);
    }
  }
});

// ==== KONTAK: Kirim ke Email ====
// document.getElementById("contact-form")?.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const name = e.target.name.value.trim();
//   const email = e.target.email.value.trim();
//   const message = e.target.message.value.trim();

//   if (!name || !email || !message) {
//     alert("Harap isi semua kolom sebelum mengirim pesan.");
//     return;
//   }

//   const subject = `Pesan dari ${name}`;
//   const body = `${message}\n\nEmail pengirim: ${email}`;
//   const mailtoLink = `mailto:radityasalesptpolyndo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

//   window.location.href = mailtoLink;
// });

// ==== KONTAK: Kirim ke WhatsApp ====
document.getElementById("whatsapp-btn")?.addEventListener("click", function () {
  const name = document.querySelector('input[name="name"]').value;
  const message = document.querySelector('textarea[name="message"]').value;
  const phone = "6285772850740";

  const whatsappURL = `https://wa.me/${phone}?text=Halo,%20saya%20${encodeURIComponent(
    name
  )}.%20${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
});

document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.getElementById("contact");

  // Ambil semua tombol yang harus menuju contact
  const contactButtons = document.querySelectorAll(
    "#btnContact, #btnContactDesktop, #btnContactMobile, #btnConsult"
  );

  contactButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Jika tombol dari menu mobile, tutup menu dulu
      if (button.id === "btnContactMobile") {
        document.getElementById("mobileMenu").classList.remove("active");
      }

      // Scroll halus ke section contact
      contactSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});
