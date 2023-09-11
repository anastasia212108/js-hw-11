import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY = "39349305-0d233f27bf70375124b5752ec";

let perPage = 40;
let currentPage = 1;

async function searchImg (inputText) {
  
  const params = new URLSearchParams({
    key: API_KEY,
    image_type: "photo",
   orientation: "horizontal",
    safesearch: true,
    q: inputText,
   page: currentPage,
  per_page: perPage,
  })
  
        const resp = await axios.get(`?${params}`)
    return resp.data;
}

function morePages() {
  currentPage +=1
}
function resetPage() {
  currentPage = 1
}


export { searchImg, morePages, resetPage, perPage, currentPage }

