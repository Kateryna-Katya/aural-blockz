/**
 * AURAL-BLOCKZ.BLOG 
 * Full Interactive Core 2025
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ИНИЦИАЛИЗАЦИЯ (Icons & AOS) ---
    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 800, 
            once: true,
            disable: 'mobile' // Опционально отключаем на слабых телефонах для плавности
        });
    }

    // --- 2. VANTA.JS NET (Фон в Hero) ---
    const vantaElement = document.getElementById('hero-vanta-bg');
    if (vantaElement && typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#hero-vanta-bg",
            mouseControls: true,
            touchControls: true,
            color: 0x6366f1,
            backgroundColor: 0xf8fafc,
            points: 10.0,
            maxDistance: 20.0,
            spacing: 16.0
        });
    }

    // --- 3. LENIS (Плавный скролл) ---
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 4. МОБИЛЬНОЕ МЕНЮ ---
    const burger = document.querySelector('.burger');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (burger) {
        burger.addEventListener('click', () => {
            const isOpen = mobileOverlay.classList.toggle('active');
            burger.classList.toggle('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // Закрытие при клике на ссылку
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- 5. БЛОГ: ПОЯВЛЕНИЕ ВСЕХ КАРТОЧЕК (Stagger) ---
    const blogPosts = document.querySelectorAll('.post-card');
    
    // Используем IntersectionObserver для запуска анимации когда блок в зоне видимости
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если зашли в секцию блога, запускаем forEach для карточек
                blogPosts.forEach((post, index) => {
                    setTimeout(() => {
                        post.style.opacity = "1";
                        post.style.transform = "translateY(0)";
                        post.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                    }, index * 200); // По очереди с интервалом 200мс
                });
                blogObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const blogSection = document.querySelector('.blog');
    if (blogSection) blogObserver.observe(blogSection);

    // --- 6. ФОРМА КОНТАКТОВ + МАГИЧЕСКАЯ КАПЧА ---
    const contactForm = document.getElementById('main-form');
    const captchaLabel = document.getElementById('captcha-text');
    
    let num1 = Math.floor(Math.random() * 9) + 1;
    let num2 = Math.floor(Math.random() * 5) + 1;
    let correctAnswer = num1 + num2;

    if (captchaLabel) {
        captchaLabel.innerText = `${num1} + ${num2} = `;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userCaptcha = document.getElementById('captcha-input').value;
            const statusMsg = document.getElementById('form-message');

            if (parseInt(userCaptcha) !== correctAnswer) {
                alert("Ошибка в вычислении капчи. Попробуйте еще раз.");
                return;
            }

            // Имитация отправки
            statusMsg.innerText = "Технологии в пути... Ваша заявка отправлена!";
            statusMsg.style.color = "var(--accent-secondary)";
            contactForm.reset();
            
            // Обновляем капчу
            num1 = Math.floor(Math.random() * 9);
            num2 = Math.floor(Math.random() * 5);
            correctAnswer = num1 + num2;
            captchaLabel.innerText = `${num1} + ${num2} = `;
        });
    }

    // --- 7. COOKIE POPUP ---
    const cookieBox = document.getElementById('cookie-popup');
    const cookieBtn = document.getElementById('cookie-accept');

    if (cookieBox && !localStorage.getItem('aural_cookies_2025')) {
        setTimeout(() => {
            cookieBox.classList.add('active');
        }, 3000);
    }

    if (cookieBtn) {
        cookieBtn.onclick = () => {
            localStorage.setItem('aural_cookies_2025', 'accepted');
            cookieBox.classList.remove('active');
        };
    }
});