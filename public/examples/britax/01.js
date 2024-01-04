import gsap from 'gsap';
import 'gsap/CSSPlugin'
import { getBounds, handleEvent, loaded, throttle } from '../../../_helpers';
import MenuDrawer from './menu-drawer'

/*
  Options:
    Snap Types:
     data-js-attach="scrollUp ?? snap"
     Default: snap
*/

class SiteHeader extends HTMLElement {
  constructor() {
    super()

    this.DOM = {}
    this.DOM.el = this
    this.DOM.scroll = this.querySelector('.js-scroll-container')
    this.DOM.logo = this.querySelector('.header-logo')
    this.DOM.scrollContent = this.querySelector('.scroll-content')
    this.DOM.alertBar = document.querySelector('notification-bar[data-storage="alertbar"]')

    this.type = this.dataset.jsAttach || 'snap';
    this.active = false
    this.pastView = false

    customElements.define('menu-drawer', MenuDrawer);

    loaded(() => {
      this.delay = (this.DOM.alertBar ? this.DOM.alertBar.isVisible() : false) ? 1000 : 300;

      if(window.scrollY >= this.getBounds().height) {
        setTimeout(() => {
          this.toggle(true)
          this.active = true
        }, this.delay);
      }
    })

    this.init()
  }

  init() {
    this.createObserver()

    switch (this.type) {
      case 'scrollUp':
        this.type_scrollUp()
        break;
    }
  }

  type_scrollUp() {
    let yPos = 0;

    handleEvent('scroll', {
      el: document,
      callback: throttle(() => {
        var st = window.pageYOffset || document.documentElement.scrollTop;

        if(this.pastView) {
          if (st > yPos && this.active){
            this.toggle(false)
            this.active = false
          } else if (st < yPos && !this.active) {
            this.toggle(true)
            this.active = true
          }
        }

        yPos = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      }, 100)
    })
  }

  type_snap() {
    if (this.type == 'snap') {
      this.toggle(true)
      this.active = true
    }
  }

  toggle(visible) {
    gsap.to(this.DOM.scroll, {
      y: visible ? '0%' : '-100%',
      ease: 'Power4.easeOut'
    })

    // document.documentElement.style.setProperty('--menu-offset', `${visible ? getBounds(this.DOM.scrollContent).height : '0'}px`);
  }

  handleEvents() {
    handleEvent('resize', {
      el: window,
      callback: throttle(() => {
        this.setHeight()
      }, 100)
    })
  }

  buildThresholdList() {
    let thresholds = [];
    let numSteps = 20;

    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }

  createObserver() {
    const observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      root: null,
      rootMargin: '0px',
      threshold: this.buildThresholdList()
    });
    observer.observe(this.DOM.el);
  }

  toggleStickyClass() {
    document.body.classList.toggle('menu-sticky')

    if(this.pastView) {
      this.DOM.scrollContent.classList.add('bg-blue-1', '!text-white')
    } else {
      this.DOM.scrollContent.classList.remove('bg-blue-1', '!text-white')
    }

    this.DOM.logo.style.width = this.pastView ? window.innerWidth >= 1100 ? '120px' : '100px' : ''

    document.documentElement.style.setProperty('--menu-offset', this.type == 'scrollUp' ? `0px` : `${getBounds(this.DOM.scrollContent).height}px`);

    this.dispatchActiveEvent()
  }

  handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if(entry.intersectionRatio == 0 && !this.active) {
        this.pastView = true;
        this.setFixed()
        this.toggleStickyClass()
      }

      if(entry.intersectionRatio == 1 && this.active) {
        this.pastView = false;
        this.setStatic()
        this.toggleStickyClass()
      }
    });
  }

  setFixed() {
    this.setHeight()

    this.DOM.scroll.style.position = 'fixed'
    this.DOM.scroll.style.zIndex = '10'
    this.DOM.scroll.style.left = '0'
    this.DOM.scroll.style.top = '0'
    this.DOM.scroll.style.width = '100%'

    gsap.set(this.DOM.scroll, {y: '-100%'})
    this.type_snap()
  }

  dispatchActiveEvent() {
    window.dispatchEvent(new CustomEvent('sticky-header', {
      detail: {
        sticky: this.active
      }
    }))
  }

  setStatic() {
    this.active = false

    gsap.set(this.DOM.scroll, {clearProps: 'all' })
    gsap.set(this, {clearProps: 'height' })
  }

  getActiveState() {
    return this.active
  }

  getBounds() {
    return getBounds(this.DOM.scroll)
  }

  setHeight() {
    gsap.set(this, {height: this.getBounds().height })
  }
}

export default customElements.define('site-header', SiteHeader);