
document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // 1. AUTOMATIC COPYRIGHT YEAR
    // =========================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =========================================
    // 2. MOBILE NAVIGATION
    // =========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("#navMenu") ||
                    document.querySelector(".nav-links") ||
                    document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        const menuIcon = menuToggle.querySelector("i");

        function openMenu() {
            navMenu.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation");

            if (menuIcon) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");
            }
        }

        function closeMenu() {
            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        }

        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = navMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });


        // Close after clicking navigation links

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                closeMenu();
            });

        });


        // Close when clicking outside

        document.addEventListener("click", function (event) {

            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }

        });


        // Close using Escape key

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        // Reset navigation when switching to desktop

        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });

    }


    // =========================================
    // 3. ACTIVE NAVIGATION LINK
    // =========================================

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(
        ".nav-menu a, .nav-links a"
    ).forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (!linkPage) return;

        const pageName = linkPage.split("#")[0];

        if (pageName === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    // =========================================
    // 4. SMOOTH SCROLLING
    // =========================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =========================================
    // 5. IMAGE ERROR FALLBACK
    // =========================================

    document.querySelectorAll("img").forEach(function (image) {

        image.addEventListener("error", function () {

            image.style.backgroundColor = "#eaf2f7";
            image.style.objectFit = "contain";

            image.alt = image.alt || "Solar energy image";

        });

    });


    // =========================================
    // 6. BACK TO TOP BUTTON
    // =========================================

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 350) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // =========================================
    // 7. FAQ ACCORDION
    // =========================================

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");

            // Close all FAQ items

            faqItems.forEach(function (faq) {

                faq.classList.remove("active");

                const button = faq.querySelector(".faq-question");

                if (button) {
                    button.setAttribute("aria-expanded", "false");
                }

            });

            // Open selected FAQ item

            if (!isOpen) {

                item.classList.add("active");

                question.setAttribute("aria-expanded", "true");

            }

        });

    });


    // =========================================
    // 8. WEBSITE LOADED
    // =========================================

    console.log("SUNARC SOLUTIONS website loaded successfully!");

});
