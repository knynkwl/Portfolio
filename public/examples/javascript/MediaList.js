// src/js/modules/MediaList.js

import { handleEvent, throttle } from '../../_helpers'

export default class {
  constructor(el) {
    this.DOM = {}
    this.DOM.el = el
    this.DOM.orderByBtns = el.querySelectorAll('button[data-order-by]')
    this.DOM.search = document.querySelector(`input#${el.dataset.search}`)
    this.DOM.pagination = el.querySelector('.js-pagination')
    this.DOM.paginationBtns = this.DOM.pagination.querySelectorAll('[data-next], [data-prev]')

    this.DOM.prev = el.querySelector('[data-prev]')
    this.DOM.next = el.querySelector('[data-next]')
    this.DOM.loader = el.querySelector('[loader]')
    this.DOM.currentIndex = el.querySelector('.current-index')
    this.DOM.totalPages = el.querySelector('.total-pages')

    this.hidden = el.hasAttribute('hidden')
  }

  init() {
    this.setVar()
    this.handleSortEvents()
    this.handlePaginationEvents()
    this.handleSearchEvents()
    this.watchHiddenEvent()
    this.originalUrl = this.getUrl()
  }

  setVar() {
    this.current = 1
    this.prev = null
    this.loading = false
    this.fetchedPage = 1
    this.total = +this.DOM.el.dataset.total
    this.url = this.DOM.el.dataset.url
    this.sort = ''
    this.search = ''
    this.order = ['desc', 'asc']
    this.ordering = 'desc'
    this.desc = 0
  }

  // Watch for hidden attribute changes
  watchHiddenEvent() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          this.reset()
          this.hidden = this.DOM.el.hasAttribute('hidden')
        }
      })
    })

    observer.observe(this.DOM.el, {
      attributes: true
    })
  }

  handlePaginationEvents() {
    for (let i = 0; i < this.DOM.paginationBtns.length; i++) {
      const el = this.DOM.paginationBtns[i];

      handleEvent('click', {
        el: el,
        callback: () => {
          if(this.hidden) return

          this.disableButtons(true)
          this.showLoader(true)
          this.updateCurrentIndex(el)
          this.fetchData()
        }
      })
    }
  }

  handleSortEvents() {
    for (let i = 0; i < this.DOM.orderByBtns.length; i++) {
      const el = this.DOM.orderByBtns[i];

      handleEvent('click', {
        el: el,
        callback: () => {
          if(this.hidden) return

          this.loading = true;
          this.desc = !this.desc;

          this.orderBy = el.dataset.orderBy;
          this.ordering = this.order[this.desc ? 1 : 0];
          this.sort = `&sort=${this.orderBy} ${this.ordering}`

          this.prev_arrow = this.DOM.el.querySelector(`[active]`);
          this.current_arrow = el.querySelector(`[${this.ordering}]`);

          this.disableButtons(true)

          this.showLoader(true)
          this.fetchData()
        }
      })
    }
  }

  handleSearchEvents() {
    handleEvent('keyup', {
      el: this.DOM.search,
      callback: throttle(() => {
        this.showLoader(true)
        if(this.hidden) return

        this.search = this.DOM.search.value.length ? `&search=${this.DOM.search.value}` : ''
        this.fetchData()
      }, 100)
    })
  }

  reset() {
    this.showLoader(true)
    this.DOM.search.value = ''
    this.setVar()
    this.url = this.originalUrl;
    this.fetchData()
  }

  getUrl() {
    return `${this.url.replace('{page}', `p${this.current}`)}${this.sort}${this.search}`
  }

  fetchData() {
    const headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest');

    fetch(this.getUrl(), {
      method: 'GET',
      headers: headers,
    }).then(res => {
      return res.text()
    }).then(res => {
      this.loading = false
      this.showLoader(false)
      this.updateArrows()

      var parser = new DOMParser();
      var doc = parser.parseFromString(res, 'text/html');

      this.total = doc.querySelector('[data-total]') ? +doc.querySelector('[data-total]').dataset.total : 0;

      this.DOM.el.querySelector('[article-list]').innerHTML = doc.querySelector('[article-list]').innerHTML;

      this.updatePagination()
      this.disableButtons(false)
    }).catch(err => {
      this.disableButtons(false)
      this.showLoader(false)
      return err;
    })
  }

  resetArrows() {
    this.current_arrow = this.DOM.el.querySelector('[data-order-by] desc')
  }

  updateArrows() {
    if(this.prev_arrow && this.current_arrow) {
      this.prev_arrow.setAttribute('opacity', '0.3');
      this.prev_arrow.removeAttribute('active');
      this.current_arrow.setAttribute('opacity', '1');
      this.current_arrow.setAttribute('active', '');
    }
  }

  updateCurrentIndex(el) {
    this.current = el.hasAttribute('data-prev') ? --this.current : ++this.current;

    if (this.current < 1) {
      this.current = 1
    }

    if (this.current > this.total) {
      this.current = +this.total
    }
  }

  disableButtons(bool) {
    this.DOM.orderByBtns.forEach(el => {
      bool ? el.setAttribute('disabled', 'disabled') : el.removeAttribute('disabled')
    })
  }

  showLoader(bool) {
    this.DOM.loader.classList.toggle('opacity-0', !bool)
    this.DOM.loader.classList.toggle('opacity-100', bool)
  }

  updatePagination() {
    if(this.total > 1) {
      this.DOM.currentIndex.innerHTML = this.current
      this.DOM.totalPages.innerHTML = this.total
      this.DOM.pagination.classList.remove('hidden')
    } else {
      this.DOM.pagination.classList.add('hidden')
    }

    if(this.current == 1) {
      this.DOM.prev.setAttribute('disabled', 'disabled')
    } else {
      this.DOM.prev.removeAttribute('disabled')
    }

    if(this.current == this.total) {
      this.DOM.next.setAttribute('disabled', 'disabled')
    } else {
      this.DOM.next.removeAttribute('disabled')
    }

  }
}
