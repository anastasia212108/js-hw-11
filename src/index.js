console.log("asd")
import { searchImg, morePages, resetPage, perPage, currentPage} from './api'
import { createMarkup } from './markup';
import Notiflix from 'notiflix';

const form = document.querySelector(".search-form");
const buttonLoadMore = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery");

let inputText;
buttonLoadMore.style.visibility = 'hidden';

form.addEventListener("submit", onSubmit)
function onSubmit(evt) {
    evt.preventDefault();
 const { searchQuery } = evt.currentTarget.elements;
    inputText = searchQuery.value;
    resetPage();
     searchQuery.value = "";
   
    if (inputText === "") {
               Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
        searchImg(inputText) 
            .then(data => {
                if (data.total === 0) {
                    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                } else if (data.total <= perPage) {
                    gallery.innerHTML = createMarkup(data.hits);
                } else {
                    gallery.innerHTML = createMarkup(data.hits);
                    buttonLoadMore.style.visibility = 'visible';
                    buttonLoadMore.addEventListener("click", onClickLoadMore);
                }
            })
            .catch(err => {
                Notify.failure(err.message);
                console.log("Error")
            })
      }
}
 function onClickLoadMore(evt) {
    evt.preventDefault();
    morePages();
     searchImg(inputText, currentPage, perPage)
         .then(data => {
                 let maxPage = Math.ceil(data.totalHits / perPage);
                  if (currentPage === maxPage) {
                     gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits));
                     buttonLoadMore.style.visibility = 'hidden';
                     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                 } else {
                     data.hits.includes(inputText);
                     gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits))
                 }
             
         })
         .catch(err => Notify.failure(err.message))
     }