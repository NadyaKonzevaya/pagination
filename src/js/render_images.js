export default function renderGallery(images) {
    return images.map(image => {
        const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
        return `<li class="photo-card">
            <a class="photo__link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${ likes }
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${ views }
                    </p>
                    <p class="info-item">
                        <b>Comments</b> ${ comments }
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${ downloads }
                    </p>
                </div>
            </a>
        </li>`
    }).join("");
}