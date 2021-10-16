import * as basicLightbox from 'basiclightbox';

window.addEventListener('DOMContentLoaded', () => {

    const API_KEY = '23874239-0e09d8b63a9c607a307702d66';
    const photoWrapper = document.querySelector('.images');
    const loader = document.querySelector('.loader');

    let page = 1;
    let total = null;
    let images = [];
    let isInitFetch = true;

    const setDefault = () => {
      page = 1;
      total = null;
      images = []
      isInitFetch = true;
      photoWrapper.replaceChildren()
    }


    const handleChange = () => {
      setDefault();
      fetchImage();
    }

    const fetchImage = () => {
      const query = document.querySelector('#search-form input[name="query"]').value;
      if (!query) return;
      loader.style.opacity = '1';
      const url =  `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&page=${page}`;
      fetch(url)
        .then((res) => res.json())
        .then(data => {
          total = data.total
          page = page + 1;
          images = [...images, ...data.hits];
          isInitFetch = false;
          data.hits.forEach((image) => renderData(image));
        })
        .catch((err) => console.error('cannot load images', err))
    }

    const showModal = (e, url) => {
      e.preventDefault();
      const instance = basicLightbox
        .create(`<img src=${url} />`)
      instance.show()
    }

    const renderData = ({largeImageURL, webformatURL }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const img = document.createElement('img');

      a.href = largeImageURL;
      a.onclick = (e) => showModal(e, largeImageURL)
      img.src = webformatURL;
      img.setAttribute('data-source', largeImageURL);
      img.setAttribute('alt', 'opis');

      photoWrapper
        .appendChild(li)
        .appendChild(a)
        .appendChild(img);
    }




    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isInitFetch) {
          if (total !== images.length) {
            fetchImage()
          } else {
            loader.style.opacity = '0';
          }
        }
      });
    };

    let observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(loader);

    window.addEventListener('change', handleChange);
    window.addEventListener('submit', (e) => (e.preventDefault()));
  });
