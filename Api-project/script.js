const accessKey = "J9K4fOEX6pykxdrXFmpsquIvxT-ncPsuKFerw-EJJS4";
const searchForm = document.querySelector("form");
const imageContainer = document.querySelector(".image-container");
const searchInput = document.querySelector(".search-input");
const loadMoreBtn = document.querySelector(".loadMoreBtn");
let page = 1;

const fetchImages = async (query, pageNo) => {
    try {
        if (pageNo === 1) {
            imageContainer.innerHTML = ''
        }
        const Url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
        const response = await fetch(Url);
        const data = await response.json()
        if (data.results.length > 0) {
            data.results.forEach(photo => {
                const imageElement = document.createElement('div');
                imageElement.classList.add("imageDiv");
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
                const overlayElement = document.createElement("div");
                overlayElement.classList.add("overlay");
                const overlayText = document.createElement("h3");
                overlayText.innerHTML = `${photo.alt_description}`;
                overlayText.classList.add("overlayText")
                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);
                imageContainer.appendChild(imageElement);
            });
            if (data.total_pages === pageNo) {
                loadMoreBtn.style.display = "none";
            } else {
                loadMoreBtn.style.display = "block";
            }
        } else {
            imageContainer.innerHTML = `<h2>Sorry.. No image found</h2>`
        }
    } catch (error) {
        imageContainer.innerHTML = `<h2>failed to load images.. please try again</h2>`
    }


}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputtext = searchInput.value.trim();
    if (inputtext !== '') {
        page = 1
        fetchImages(inputtext, page);
    } else {
        imageContainer.innerHTML = `<h2>Please Enter a search query</h2>`
    }

})

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page)
})



