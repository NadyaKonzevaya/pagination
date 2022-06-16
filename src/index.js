import './sass/index.scss';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import renderGallery from './js/render_images';
import ApiService from './js/api';

const apiService = new ApiService();
const refs = {
    gallery: document.querySelector(".gallery"),
    form: document.querySelector(".search-form"),
}
const options = {
    totalItems: 0,
    itemsPerPage: 3,
    visiblePages: 10,
    page: 1,
}
const pagination = new Pagination('pagination', options);
console.dir(pagination);

const page = pagination.getCurrentPage();
// let searchQuery = "";

apiService.itemsPerPage = options.itemsPerPage;

refs.form.addEventListener("submit", onFormSubmit);

apiService.fetchPopularImages(page).then(({ images, total }) => {
    const markup = renderGallery(images);
    refs.gallery.insertAdjacentHTML("beforeend", markup);
    pagination.reset(total);
});


function popular(event) {
    const currentPage = event.page;

    apiService.fetchPopularImages(currentPage).then(({ images }) => {
        const markup = renderGallery(images);
        refs.gallery.insertAdjacentHTML("beforeend", markup);
    });
}

pagination.on('afterMove', popular);

function onFormSubmit(event) {
    event.preventDefault();

    refs.gallery.innerHTML = "";
    
    pagination.off('afterMove', popular);
    pagination.movePageTo(1);
    pagination.on('afterMove', bySearch);

    apiService.searchQuery = event.currentTarget.elements.searchQuery.value;
    
    apiService.fetchImagesByName(page).then(({ images, total }) => {
        const markup = renderGallery(images);
        refs.gallery.insertAdjacentHTML("beforeend", markup);
        pagination.reset(total);
    });
}

function bySearch(event) {
    const currentPage = event.page;
    apiService.fetchImagesByName(currentPage).then(({ images }) => {
        const markup = renderGallery(images);
        refs.gallery.insertAdjacentHTML("beforeend", markup);
    });
}


