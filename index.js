
//grab the news container
let newsAccordion = document.getElementById('newsAccordion');


//creating source and apikey
let source = 'in';
let apiKey = '1f5e888f053c470bbd14fb1c475045a5'
//crerate a get element
let newsApi;
newsApi = new XMLHttpRequest();
newsApi.open('GET', `https://newsapi.org/v2/top-headlines?country=${source}&apiKey=${apiKey}`, true);

newsApi.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        let newsHTML;
        let news
        articles.forEach(function(element, index) {
            console.log(element, index)
             news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                   <b>Breaking News ${index+1}:</b> ${element["title"]}
                                </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" ><input type="button" class="btn2" value="Read More"> </a>  </div> 
                            </div>
                        </div>`; //if wanted to read more news then click on read
            newsHTML += news;
            newsAccordion.innerHTML = newsHTML;
        });
    }
    else {
        console.log("Some error occured");
    }
}
newsApi.send();


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let newsCards = document.getElementsByClassName('card');
    Array.from(newsCards).forEach(function(element){
        let cardTxt = element.getElementsById("heading")[0].title;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

