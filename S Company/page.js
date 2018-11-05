(() => {
  const mobileWidth = 680;

  const addMenuBackground = () => {
    const pageWidth = window.innerWidth;
    const bodyOffset =
      document.body.scrollTop || document.documentElement.scrollTop;
    const navigation = document.querySelector("header nav");
    if (pageWidth > mobileWidth) {
      bodyOffset > 0
        ? navigation.classList.add("wp-nav-fixed")
        : navigation.classList.remove("wp-nav-fixed");
    }
  };

  //Making burger menu

  const burgerMenu = () => {
    const pageWidth = window.innerWidth;
    const navContainer = document.querySelector("header nav .wp-container");
    const navigation = document.querySelector("header nav .wp-navigation");
    const mobileNav = document.querySelector("body > .wp-navigation");

    if (pageWidth <= mobileWidth && navigation) {
      document.body.insertAdjacentElement("afterbegin", navigation);
    } else if (pageWidth > mobileWidth && mobileNav) {
      navContainer.insertAdjacentElement("beforeend", mobileNav);
    }
  };

  const mobileMenuToggle = () => {
    const menuToggle = document.querySelector(".wp-nav-toggle");

    menuToggle.addEventListener("click", () => {
      const mobileNav = document.querySelector("body > .wp-navigation");

      mobileNav.classList.toggle("wp-navigation-opened");
    });
  };

  const navItemClick = () => {
    const navItemList = document.querySelectorAll(".wp-section-link");
    const navItems = [...navItemList];

    navItems.forEach(item => {
      item.addEventListener("click", event => {
        event.preventDefault();
        const sectionId =
          event.target.getAttribute("href") || event.target.dataset.href;

        scrollToSection(sectionId);
      });
    });
  };

  const scrollToSection = sectionId => {
    let sectionPosition, sectionOffset;
    const navigationHeight = document.querySelector("header nav").offsetHeight;
    const pageWidth = window.innerWidth;

    if (sectionId !== "#") {
      sectionOffset = document.querySelector(sectionId).offsetTop;
      sectionPosition =
        pageWidth > mobileWidth
          ? sectionOffset - navigationHeight
          : sectionOffset;
    } else {
      sectionPosition = 0;
    }

    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: sectionPosition
    });
  };

  const testimonialChange = () => {
    let firstChild, lastChild;
    const prevArrow = document.querySelector("#wp-prev-testimonial");
    const nextArrow = document.querySelector("#wp-next-testimonial");
    const testimonial = document.querySelector(".wp-testimonials ul");

    document.addEventListener("click", () => {
      if (event.target === prevArrow) {
        lastChild = testimonial.lastElementChild;
        testimonial.insertAdjacentElement("afterbegin", lastChild);
      } else if (event.target === nextArrow) {
        firstChild = testimonial.firstElementChild;
        testimonial.insertAdjacentElement("beforeend", firstChild);
      }
    });
  };

  const onGalleryClick = () => {
    const galleryImageList = document.querySelectorAll("#wp-gallery li");
    const galleryimages = [...galleryImageList];

    galleryimages.forEach(image => {
      image.addEventListener("click", event => {
        galleryImageOpen(event.target);
      });
    });
    const galleryImageOpen = image => {
      const imageSrc = image.getAttribute("src");
      const openedImage = `<div class="wp-backdrop"><img src="${imageSrc}" alt = ''/>
                           <span class= "wp-backdrop-close"> X </span> </div>`;

      document.body.insertAdjacentHTML("beforeend", openedImage);

      galleryImageClose();
    };

    const galleryImageClose = () => {
      const closeButton = document.querySelector(".wp-backdrop-close");

      closeButton.addEventListener("click", () => {
        const backdrop = document.querySelector(".wp-backdrop");
        backdrop.remove();
      });
    };
  };

  window.addEventListener("scroll", () => {
    addMenuBackground();
  });

  window.addEventListener("resize", () => {
    // for resize to kick in after the page reduces
    burgerMenu();
  });

  navItemClick();
  onGalleryClick();
  testimonialChange();
  burgerMenu();
  mobileMenuToggle();
})();
