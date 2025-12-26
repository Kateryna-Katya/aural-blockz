/**
 * AURAL-BLOCKZ.BLOG — Полный функционал платформы
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК И AOS
    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2. VANTA.JS NET EFFECT (HERO ANIMATION)
    if (document.getElementById('hero-vanta-bg') && typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#hero-vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x6366f1,
            backgroundColor: 0xf8fafc,
            points: 10.00,
            maxDistance: 20.00,
            spacing: 16.00
        });
    }

    // 3. ПЛАВНЫЙ СКРОЛЛ (LENIS)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) lenis.scrollTo(target);
            });
        });
    }

    // 4. HEADER & MOBILE MENU
    const header = document.querySelector('.header');
    const burger = document.querySelector('.burger');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileClose = document.querySelector('.mobile-close');

    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    if (burger) {
        burger.onclick = () => {
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
    }

    if (mobileClose) {
        mobileClose.onclick = () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };
    }

    // 5. ЛОГИКА БЛОГА: ЗАГРУЗКА ТОЛЬКО ПЕРВОГО ЭЛЕМЕНТА
    // Эта функция находит сетку блога и скрывает всё, кроме первого поста
    const initBlogFilter = () => {
        const blogGrid = document.querySelector('.blog .grid-3');
        if (blogGrid && blogGrid.children.length > 0) {
            const posts = Array.from(blogGrid.children);
            posts.forEach((post, index) => {
                if (index !== 0) {
                    post.style.display = 'none'; // Скрываем все, кроме первого
                }
            });
            console.log("Блог: отображен только последний актуальный пост.");
        }
    };
    initBlogFilter();

    // 6. ФОРМА КОНТАКТОВ + КАПЧА
    const contactForm = document.getElementById('main-form');
    const captchaLabel = document.getElementById('captcha-text');
    const formMessage = document.getElementById('form-message');

    let n1 = Math.floor(Math.random() * 10) + 1;
    let n2 = Math.floor(Math.random() * 5) + 1;
    let result = n1 + n2;
    if (captchaLabel) captchaLabel.innerText = `${n1} + ${n2} = `;

    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            const userAns = document.getElementById('captcha-input').value;
            const phone = document.getElementById('phone').value;

            // Валидация телефона (цифры)
            if (!/^[0-9+\-\s()]+$/.test(phone)) {
                alert("Ошибка: Неверный формат телефона");
                return;
            }

            // Валидация капчи
            if (parseInt(userAns) !== result) {
                alert("Ошибка капчи!");
                return;
            }

            formMessage.innerText = "Отправка...";
            setTimeout(() => {
                formMessage.innerText = "Успешно! Мы свяжемся с вами.";
                formMessage.style.color = "var(--accent-secondary)";
                contactForm.reset();
            }, 1500);
        };
    }

    // 7. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    if (cookiePopup && !localStorage.getItem('cookies_accepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2000);
    }
    document.getElementById('cookie-accept').onclick = () => {
        localStorage.setItem('cookies_accepted', 'true');
        cookiePopup.classList.remove('active');
    };
});