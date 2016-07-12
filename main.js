(function() {
'use strict'

var state = { //The Model in the MVC
  sources : [
              {name:"Mashable",url:"#"},
              {name:"Reddit",url:"#"},
              {name:"Behance",url:"#"}
            ],
  currentSource: "Mashable",
  articleFeed: []
}

var body = document.querySelector('body');
var headerContainer = document.querySelector('#header-container') // store header container in a variable
var container = document.querySelector('#container') // store container in a variable

//fetch functions
var fetchMashable = () => {
  state.currentSource = "Mashable";
  state.articleFeed =[]
  renderLoading(state,container)
  renderHeader(headerContainer,state); //render the header into separate container
   fetch('https://crossorigin.me/http://mashable.com/stories.json')
     .then((response,err) => {
       return response.json()
       state.articleFeed =[]
     }).then((result) => {
       var convertArray = Object.keys(result.hot)
       var itemIndex = 0;
       console.log(result.hot)
       convertArray.forEach(function(key){
         var articleObject = {}
         articleObject.index = itemIndex;
         articleObject.link = result.hot[key].link;
         articleObject.image = result.hot[key].image;
         articleObject.name = result.hot[key].display_title;
         articleObject.category = result.hot[key].channel;
         articleObject.rating = result.hot[key].shares.total;
         articleObject.snippet = result.hot[key].excerpt;
         state.articleFeed.push(articleObject)
         itemIndex ++;
       })
       var arrayOfArticles = Object.keys(state.articleFeed)
       renderArticleFeed(state.articleFeed,container);
    }).catch((err)=>{
      renderError(container,state.currentSource);
    })
}


var fetchReddit = () =>{
  state.currentSource = "Reddit";
  renderHeader(headerContainer,state); //render the header into separate container
  renderLoading(state, container) //render the loading spinner on page load.
    fetch('https://crossorigin.me/https://www.reddit.com/top.json')
      .then((response,err)=> {
        return response.json()
        .then((responseAsJson)=>{
          state.articleFeed = []
          var convertArray = Object.keys(responseAsJson.data.children)
          var itemIndex = 0;
          convertArray.forEach(function(key){
            var articleObject = {}
            articleObject.index = itemIndex;
            articleObject.link = "http://reddit.com" + responseAsJson.data.children[key].data.permalink;
            articleObject.image = responseAsJson.data.children[key].data.url;
            articleObject.rating = responseAsJson.data.children[key].data.score;
            articleObject.category = responseAsJson.data.children[key].data.subreddit;
            articleObject.name = responseAsJson.data.children[key].data.title;
            articleObject.snippet = responseAsJson.data.children[key].data.subreddit;
            state.articleFeed.push(articleObject)
            itemIndex ++;
          })
          renderArticleFeed(state.articleFeed,container);
        })
      }).catch((err)=>{
        renderError(container,state.currentSource);
      })
}


var fetchBehance = () => {
    state.currentSource = "Behance";
    renderHeader(headerContainer,state); //render the header into separate container
    renderLoading(state, container) //render the loading spinner on page load.
      fetch('https://crossorigin.me/https://api.behance.net/v2/users/travisneilson/projects?client_id=3HpZcEDn2VslBZCtZLiBt2EOs7JlROMU')
        .then((response,err)=>{
          return response.json()
        })
        .then((behanceObject)=>{
          state.articleFeed = []
          var convertArray = Object.keys(behanceObject.projects)
          var itemIndex = 0;
          convertArray.forEach(function(key){
            var articleObject = {}
            articleObject.index = itemIndex;
            articleObject.link = behanceObject.projects[key].url;
            articleObject.image = behanceObject.projects[key].covers.original;
            articleObject.rating = behanceObject.projects[key].stats.views;
            articleObject.category = behanceObject.projects[key].fields[0]
            articleObject.name = behanceObject.projects[key].name;
            articleObject.snippet = behanceObject.projects[key].fields.join(", ");
            state.articleFeed.push(articleObject)
            itemIndex ++
          })
          renderArticleFeed(state.articleFeed,container);
        })
        .catch((err)=>{
          renderError(container,state.currentSource);
        })
}

///Render functions

function renderLoading(data, into) {
  into.innerHTML = `<div id="pop-up" class="loader"></div>`
}

function renderHeader(into,state){
  into.innerHTML = `
  <header>
  <section class="wrapper">
    <a href="#"><h1 id ="logo">Feedr</h1></a>
    <nav>
      <ul>
        <li><a href="#">Reading from: ${state.currentSource} <span></span></a>
        <ul>
          ${state.sources.map((item)=>{
            return `${renderNavItems(item)}`
          }).join("")}
        </ul>
        </li>
      </ul>
    </nav>
    <div class="clearfix"></div>
  </section>
</header>`
}

function renderNavItems(item){
  return `<li id="${item.name}"><a href="${item.url}">${item.name}</a></li>`
}


function renderPopup(data,into,index){
  into.innerHTML = `
    <div id="pop-up">
      <a href="#" class="close-pop-up">X</a>
      <div class="wrapper">
        <h1>${data.articleFeed[index].name}</h1>
        <img src = "${data.articleFeed[index].image}" onerror="this.src='http://orig02.deviantart.net/cd44/f/2016/152/2/d/placeholder_3_by_sketchymouse-da4ny84.png'"></img>
        <p>
        ${data.articleFeed[index].snippet}
        </p>
        <a href="${data.articleFeed[index].link}" class="pop-up-action" target="_blank">Read more from source</a>
      </div>
    </div>`
}

function renderError(into,name){
  into.innerHTML = `  <div class="error-dialogue">
        <p><span>Error!</span> <br> Could not load feed for ${name}</p>
        </div>
        <div class="wrapper">
        <h2>You can try the following:</h2>
        <ul>
          <li>Refresh the page</li>
          <li>Come back later</li>
          <li>Select another feed from the dropdown options.</li>
        </ul>
        </div>`
}


function renderArticles(item){
  return `<article class="article" id="${item.index}" >
    <section class="featured-image">
      <img src="${item.image}" onerror="this.src='http://orig02.deviantart.net/cd44/f/2016/152/2/d/placeholder_3_by_sketchymouse-da4ny84.png'" alt="" />
    </section>
    <section class="article-content">
      <a href="#"><h3>${item.name}</h3></a>
      <h6>${item.category}</h6>
    </section>
    <section class="impressions">
      ${item.rating}
    </section>
    <div class="clearfix"></div>
  </article>`
}

function renderArticleFeed(data,into) {
  into.innerHTML = `<section id="main" class="wrapper">
    ${state.articleFeed.map((item)=>{
    return `${renderArticles(item)}`
  }).join("")}
    </section>`
}

//on page load
fetchMashable()

//event listener
delegate('body', 'click', 'li', (event) => {
  console.log(state.articleFeed)
  console.log(event)
  console.log(event.delegateTarget)
  if (event.delegateTarget.id === "Reddit") {
    fetchReddit();
  } else if (event.delegateTarget.id === "Behance") {
    fetchBehance();
  } else if (event.delegateTarget.id === "Mashable") {
    fetchMashable();
  }
})

delegate('body', 'click', 'article', (event) =>{
  var index = event.delegateTarget.id;
  renderPopup(state,container,index)
})

delegate ('body','click','a', (event) => {
  if (event.delegateTarget.classList.contains("close-pop-up")) {
    renderArticleFeed(state,container)
  }
})

delegate ('body','click','h1',(event)=>{
  if (event.delegateTarget.id === "logo") {
  fetchMashable()
  }

})

})()




/*

<section id="search">
  <input type="text" name="name" value="">
  <div id="search-icon"><img src="images/search.png" alt="" /></div>
</section>

*/
