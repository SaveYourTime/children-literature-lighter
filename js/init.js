(() => {
  // M.AutoInit();
  let counts = 0;

  const sidenav = M.Sidenav.init(document.querySelector('.sidenav'));
  sidenav.el.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      sidenav.close();
    }
  });

  M.Collapsible.init($('.collapsible.expandable'), {
    accordion: false
  });

  M.Carousel.init(document.querySelectorAll('.carousel'), {
    fullWidth: true,
    indicators: true
  });
  
  document.addEventListener('lazyloaded', (e) => {
    if (e.target.closest('.slider')) {
      counts++;
      if (counts === e.target.closest('.slides').childElementCount) {
        M.Slider.init(e.target.closest('.slider'), {
          height: 300,
          duration: 500,
          interval: 2000,
        });
        counts = 0;
      }
    }
  });

  document.querySelector('.read-more a.btn').addEventListener('click', () => {
    document.querySelector('.read-more').style.display = 'none';
    document.querySelector('.table-wrapper').style.maxHeight = `${document.querySelector('.table-wrapper').scrollHeight}px`;
  });

  const handleHeaderNavScrollTransition = () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('hide-box-shadow', window.pageYOffset > 0 ? false : true);
    window.innerWidth > 992 && nav.style.setProperty('background-color', `rgba(255, 255, 255, ${window.pageYOffset / 300})`, 'important');
  }
  window.addEventListener('scroll', handleHeaderNavScrollTransition);

  const navs = [...document.querySelectorAll('.navbar-fixed ul li a'), ...document.querySelectorAll('.sidenav li a')];
  function handleScrollToEffect(e) {
    e.preventDefault();
    const elementId = this.getAttribute('href');
    const top = elementId === '#' ? 0 : document.querySelector(elementId).offsetTop - 64;
    window.scroll({ top, left: 0, behavior: 'smooth' });
    gtag('event', 'Nav Click', {
      'event_category': 'Click',
      'event_label': this.textContent
    });
  }
  navs.forEach((nav) => nav.addEventListener('click', handleScrollToEffect));
})();