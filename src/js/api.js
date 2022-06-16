const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "27639427-70597f5ebc7133bee1f081188";

export default class ApiService {
    constructor() {
        this.searchQuery = "";
        this.itemsPerPage = 0;
    }

    fetchPopularImages(page) {
        console.log(page);
        return fetch(`${BASE_URL}?key=${API_KEY}&q=yellow+flowers&image_type=photo&page=${page}&per_page=${this.itemsPerPage}`).then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        }).then(data => ({ images: data.hits, total: data.totalHits }) );
    };

    fetchImagesByName(page) {
        return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&page=${page}&per_page=${this.itemsPerPage}`).then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        }).then(data => ({ images: data.hits, total: data.totalHits }) );
    };

}


 
