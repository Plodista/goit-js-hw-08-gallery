import itemsGal from './gallery-items.js';


const galleryEl = document.querySelector('.js-gallery'); 
const lightboxContainerEl = document.querySelector('.js-lightbox'); 
const lightboxImageEl = document.querySelector('.lightbox__image'); 
const modalCloseButton = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxOverlay = document.querySelector('div.lightbox__overlay');

function createGalleryCardsMarkup(picturesArr) {
  return picturesArr
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <img class="gallery__image" src="${preview}" alt="${description}" data-src="${original}" data-descr="${description}"/>
</li>`;
    })
    .join('');
}

const galleryItemsEl = createGalleryCardsMarkup(itemsGal);
galleryEl.insertAdjacentHTML('beforeend', galleryItemsEl);

galleryEl.addEventListener('click', onGalleryCardsClick);
function onGalleryCardsClick(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  openModal();
  getOriginalPicturesAtribut(event);
}

function openModal() {
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onLeftKeyPress);
  window.addEventListener('keydown', onRightKeyPress);
  lightboxContainerEl.classList.add('is-open');
}

function getOriginalPicturesAtribut(event) {
  lightboxImageEl.src = event.target.dataset.src;
  lightboxImageEl.alt = event.target.descr;
}

modalCloseButton.addEventListener('click', onModalCloseButtonClick);
function onModalCloseButtonClick() {
  closeModal();
  cleanOriginalPicturesAtribut();
}

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onLeftKeyPress);
  window.removeEventListener('keydown', onRightKeyPress);
  lightboxContainerEl.classList.remove('is-open');
}

function cleanOriginalPicturesAtribut() {
  lightboxImageEl.src = '';
  lightboxImageEl.alt = '';
}


lightboxOverlay.addEventListener('click', onOverlayClikc);
function onOverlayClikc(event) {
  if (event.target === event.currentTarget) {
    closeModal();
    cleanOriginalPicturesAtribut();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
    cleanOriginalPicturesAtribut();
  }
}

function onLeftKeyPress(event) {
  if (event.code === 'ArrowLeft') {
    const i =
      itemsGal.findIndex(picture => picture.original === lightboxImageEl.src) -
      1;
    if (i === -1) {
      return;
    }
    lightboxImageEl.src = itemsGal[i].original;
    lightboxImageEl.alt = itemsGal[i].description;
  }
}
function onRightKeyPress(event) {
  if (event.code === 'ArrowRight') {
    const i =
      itemsGal.findIndex(picture => picture.original === lightboxImageEl.src) +
      1;
    if (i === itemsGal.length - 1) {
      return;
    }
    lightboxImageEl.src = itemsGal[i].original;
    lightboxImageEl.alt = itemsGal[i].description;
  }
}

