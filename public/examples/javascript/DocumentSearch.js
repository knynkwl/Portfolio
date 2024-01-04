import { fetchAjaxTemp } from '../../../_actions';
import { handleEvent } from '../../../_helpers';

class DocumentSearch extends HTMLElement {
  constructor() {
    super();

    this.DOM = {}
    this.DOM.media_results = document.querySelector('.media-results')
    this.DOM.active_filter = document.querySelector('.active-filter')
    this.DOM.active_filter_text = document.querySelector('.active-filter-text')
    this.DOM.active_filter_button = document.querySelector('.active-filter-btn')
    this.DOM.form = this.querySelector('form')

    this.loading = false
    this.query = this.dataset.query ? this.dataset.query : ''
    this.search_string = this.dataset.query ? this.dataset.query : ''
    this.limit = this.dataset.limit ? this.dataset.limit : null
    this.document_names = []
    this.document_cloud_results = []
    this.related_craft_entries = []
  }

  connectedCallback() {
    this.handleSearch()
  }

  handleSearch() {
    this.performSearch()

    if (this.DOM.form) {
      handleEvent('submit', {
        el: this.DOM.form,
        preventDefault: true,
        callback: (e) => {
          this.search_string = this.querySelector('input').value
          this.performSearch()
        }
      });
    }

    if (this.DOM.active_filter_button) {
      handleEvent('click', {
        el: this.DOM.active_filter_button,
        callback: (e) => {
          window.location.href = window.location.origin + window.location.pathname
        }
      });
    }
  }

  performSearch() {
    if(this.search_string) {
      this.loading = true
      this.handleLoading()
      this.fetchData()
    }
  }

  handleLoading() {
    if (this.DOM.form) {
      this.querySelector('input').disabled = this.loading
      this.querySelector('button[type="submit"]').disabled = this.loading
      this.querySelector('button[type="submit"] .text').style.opacity = (this.loading ? 0 : 1)
      this.querySelector('button[type="submit"] i').style.display = (this.loading ? 'inline-block' : 'none')
    }

    if(this.querySelector('.loader')) {
      this.querySelector('.loader').style.display = (this.loading ? '' : 'none')
    }
  }

  fetchData() {
    fetch(`https://api.www.documentcloud.org/api/documents/search/?expand=user%2Corganization&format=json&hl=true&q=organization%3Adocumented-2565+${this.search_string}&version=2.0`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    }).then((response) => {
      return response.json();
    }).then((response) => {
      this.loading = false
      this.document_cloud_results = response.results.map(({ highlights, slug }) => ({ highlights, slug }));
      this.document_names = response.results.map((result) => `'*${result.slug}*'`);
      if (this.document_cloud_results.length == 0) {
        this.update_results().then(() => {
          this.handleLoading()
        })
      } else {
        this.fetchCraftData()
      }


    }).catch((error) => {
      this.loading = false
      this.handleLoading()
      console.error(error);
    });
  }

  fetchCraftData() {
    const query = `
      section: "media",
      orderBy: "postDate DESC",
      search:"embedCode:${this.document_names.join(' OR ')} OR '${this.search_string}'"`

    const graphqlQuery = `
      {
        entries(${query}) {
          id,
          ... on media_default_Entry {
            embedCode,
          }
        }
      }
    `;

    const url = '/api';

    const headers = {
      'Content-Type': 'application/json',
    };

    fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: graphqlQuery }),
      })
      .then((response) => response.json())
      .then((data) => {
        function mergeArrays(array1, array2) {
          return array1.map(item1 => {
              let matchingObject = array2.find(item2 => item1.embedCode.includes(item2.slug));

              return matchingObject ? { ...item1, ...matchingObject } : item1;
          });
        }

        // Call the function to merge arrays
        this.all_craft_entries = mergeArrays(data.data.entries, this.document_cloud_results);
        this.related_craft_entries = this.limit ? this.all_craft_entries.slice(0, this.limit) : this.all_craft_entries

        this.update_results().then(() => {
          this.handleLoading()
        })
      })
      .catch((error) => {
        // Handle any errors
        this.handleLoading()
        console.error('Error:', error);
      });
  }

  // Render and list the results
  async update_results() {
    await fetch(`/ajax/media-articles?query=${this.search_string}&ids=${this.related_craft_entries.map((entry) => entry.id)}`).then(res => {
      return res.text()
    }).then((res) => {
      this.handleLoading()
      var parser = new DOMParser();
      var doc = parser.parseFromString(res, 'text/html');

      if (document.querySelector('.pagination')) {
        document.querySelector('.pagination').classList.add('hidden')
      }

      if (this.DOM.active_filter) {
        if (this.search_string) {
          this.DOM.active_filter.classList.remove('hidden')
          this.DOM.active_filter_text.innerHTML = this.search_string
        } else {
          this.DOM.active_filter.classList.add('hidden')
        }
      }

      if (this.querySelector('.media-results-total') && this.all_craft_entries) {
        this.querySelector('.media-results-total-btn').classList.remove('hidden')
        this.querySelector('.media-results-total').innerHTML = this.all_craft_entries.length - 3
      }

      this.DOM.media_results.innerHTML = doc.querySelector('#ajax-content').innerHTML

      for (let i = 0; i < this.related_craft_entries.length; i++) {
        const el = this.related_craft_entries[i];

        const highlight = document.querySelector(`[data-id="${el.id}"] [data-highlight]`);

        if (el.highlights != undefined && Object.keys(el.highlights).length !== 0) {
          var firstKey = Object.keys(el.highlights)[0];
          var firstValue = el.highlights[firstKey];

          if (firstValue) {
            highlight.innerHTML = `${firstValue}`
          } else {
            highlight.classList.add('hidden')
          }
        } else {
          highlight.classList.add('hidden')
        }
      }
    })
  }
}

export default customElements.define('document-search', DocumentSearch);
