const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.name.value.trim(),
            phone: this.phone.value.trim(),
            email: this.email.value.trim(),
            service: this.service.value,
            message: this.message.value.trim()
        };
        
        if (!formData.name || !formData.phone || !formData.service || !formData.message) {
            alert('Please fill in all required fields!');
            return;
        }
        
        // ⚠️ CHANGE THIS NUMBER TO YOUR WHATSAPP NUMBER!
        const whatsappNumber = '919945442248'; // Format: 919876543210 (no + or spaces)
        
        const whatsappMessage = `*New Website Inquiry*
        
👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone}
📧 *Email:* ${formData.email || 'Not provided'}
🔧 *Service:* ${formData.service}

💬 *Message:*
${formData.message}

---
Sent from agxen.in`;
        
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        alert('✅ Thank you for your inquiry!\n\nRedirecting you to WhatsApp to complete your request...');
        
        window.open(whatsappURL, '_blank');
        
        this.reset();
    });
    
    const phoneInput = contactForm.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            if (value.length > 5) {
                value = value.slice(0, 5) + ' ' + value.slice(5);
            }
            
            e.target.value = value;
        });
    }
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .feature, .info-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

console.log('%c👋 Welcome to AGXen!', 'color: #0A66C2; font-size: 20px; font-weight: bold;');
console.log('%c🏗️ Infrastructure | 💻 IT Solutions | 📹 CCTV Services', 'color: #6C757D; font-size: 14px;');
