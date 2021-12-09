const KEY = '313698e5d41cebecef7dd7a6fb93043d';

const searchField = document.querySelector("#searchpic");
const searchButton = document.querySelector("#searchBtn");
const displayPic = document.querySelector("#pics");
const picSize = document.querySelector("#size");
const picAmount = document.querySelector("#amount");


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
        
        console.log(searchField.value);


        getData().then((data)=>{
            //för att lista fram fler bilder.
            for(let i= 0; i< picAmount.value; i++) {
                manageTheData(data.photos.photo[i]);
            }
            
            
        });
        

        searchField.value = "";

    })
}




function manageTheData(photoObject) {

    let photo = photoObject;
    let size = picSize.value;
    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    let img = document.createElement('img');
    img.src = imgUrl;

    displayPic.appendChild(img);

 
}



search();