

const KEY = '313698e5d41cebecef7dd7a6fb93043d';

const searchField = document.querySelector("#searchpic");
const searchButton = document.querySelector("#searchBtn");
const displayPic = document.querySelector(".carousel-inner");
const picSize = document.querySelector("#size");
const picAmount = document.querySelector("#amount");
const slideShow = document.querySelector("#carousel slide");
const loaderItem = document.querySelector("#loader");


async function getData () {

    try{

        const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchField.value}&format=json&nojsoncallback=1&per_page=${picAmount.value}&page=1`;
    
        const response = await fetch(url);
        const data = await response.json();

        return data;

    } catch(err) {
        alert("Ojdå, något gick fel"); 
      }
      
    
}




function search () {
    searchButton.addEventListener("click", ()=> {
       
        const theSlideShow = document.querySelector("#the-slide-show");
        theSlideShow.setAttribute("style", "display: block");

        loader();
        console.log(searchField.value);
        getTheData(activateFirstPic);
       
        searchField.value = "";
        
    });
}



function getTheData (callback){

    getData().then((data)=>{
        //för att lista fram fler bilder.

        hideLoader();
        for(let i= 0; i< picAmount.value; i++) {
            manageTheData(data.photos.photo[i]);
            
        }
        callback();
    });
    
}




function manageTheData(photoObject) {

    let photo = photoObject;
    let size = picSize.value;
    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;



    const addPicInCarusel = `
        <div class="carousel-item">
            <img src=${imgUrl} class="d-block w-100" alt="...">
        </div>
        `;

      
    displayPic.innerHTML += addPicInCarusel;
    

    

}


function activateFirstPic() {
    const picItem = document.querySelectorAll(".carousel-item");
         picItem[0].setAttribute("class", "carousel-item active");
  
}



function loader() {
    loaderItem.setAttribute("style", "display: block");

        anime({
            targets: loaderItem,
            keyframes: [
            {translateX: -50, opacity: 0, duration:0},
            {translateX: 0, opacity:1, duration:500},
            {translateX: 50, opacity:0,delay: 100, duration:500},
            ],
            easing: 'linear',
            delay: anime.stagger(2500, {start: 0}),
            loop: true
        });
    
}


function hideLoader() {
    loaderItem.setAttribute("style", "display: none");
}



search();




