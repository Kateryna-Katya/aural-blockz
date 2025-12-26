document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация UI
    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof AOS !== 'undefined') AOS.init({ duration: 900, once: true });

    // 2. 3D Фон Vanta
    if (document.getElementById('hero-vanta-bg') && typeof VANTA !== 'undefined') {
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

    // 3. Lenis (Плавный скролл)
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 4. БЛОГ: ПРАВИЛЬНЫЙ FOR-EACH (Staggered Animation)
    const blogPosts = document.querySelectorAll('.post-card');
    
    blogPosts.forEach((post, index) => {
        // Устанавливаем задержку для каждого последующего элемента
        setTimeout(() => {
            post.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
            post.style.opacity = "1";
            post.style.transform = "translateY(0)";
        }, index * 200); // Интервал 200мс между карточками
    });

    // 5. МОБИЛЬНОЕ МЕНЮ
    const burger = document.querySelector('.burger');
    const overlay = document.querySelector('.mobile-overlay');
    const closeBtn = document.querySelector('.mobile-close');

    if (burger) {
        burger.onclick = () => overlay.classList.add('active');
    }
    if (closeBtn) {
        closeBtn.onclick = () => overlay.classList.remove('active');
    }

    // 6. ФОРМА И КАПЧА
    const form = document.getElementById('main-form');
    let n1 = Math.floor(Math.random() * 9) + 1;
    let n2 = Math.floor(Math.random() * 5);
    let result = n1 + n2;

    const capText = document.getElementById('captcha-text');
    if (capText) capText.innerText = `${n1} + ${n2} = `;

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const ans = document.getElementById('captcha-input').value;
            if (parseInt(ans) === result) {
                document.getElementById('form-message').innerText = "Успешно отправлено!";
                form.reset();
            } else {
                alert("Ошибка капчи");
            }
        };
    }

    // 7. COOKIE
    const cp = document.getElementById('cookie-popup');
    if (cp && !localStorage.getItem('cookies_v1')) {
        setTimeout(() => cp.classList.add('active'), 2000);
    }
    document.getElementById('cookie-accept').onclick = () => {
        localStorage.setItem('cookies_v1', 'y');
        cp.classList.remove('active');
    };
});