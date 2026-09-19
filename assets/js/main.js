// Main JS — Web em Vista
document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // MOBILE MENU
    // =============================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const menuClose = document.getElementById('mobile-menu-close');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    const openMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('pointer-events-none');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileOverlay.classList.add('opacity-100');
        mobileDrawer.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
        if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
    };

    const closeMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.add('pointer-events-none');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileOverlay.classList.remove('opacity-100');
        mobileDrawer.classList.add('translate-x-full');
        document.body.style.overflow = '';
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
    };

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    // Close menu when a nav link inside drawer is clicked
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // =============================================
    // LIGHTBOX MODAL (Portfolio)
    // =============================================
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.getElementById('close-modal');

    const showModal = (src, alt) => {
        if (!modal || !modalImg) return;
        modalImg.src = src;
        modalImg.alt = alt || 'Projeto Web em Vista';
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    const hideModal = () => {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    };

    // Handle portfolio items with class (preferred method)
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) showModal(img.src, img.alt);
        });
    });

    // Handle portfolio items using data-lightbox (fallback for inline onclick cards)
    document.querySelectorAll('[data-lightbox-src]').forEach(el => {
        el.addEventListener('click', () => {
            showModal(el.dataset.lightboxSrc, el.dataset.lightboxAlt || '');
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal();
            closeMenu();
        }
    });
});
