/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

/*
article:[{
  image:,
  title:,
  category:,
  rating:,
  snippet: first 300 chars or so + ...,
},{
  image:,
  title:,
  category:,
  rating:,
  snippet: first 300 chars or so + ...,
},{
  image:,
  title:,
  category:,
  rating:,
  snippet: first 300 chars or so + ...,
}]
*/


(function() {
'use strict'

//Fetch Mashable api
   fetch('https://crossorigin.me/http://mashable.com/stories.json')
     .then((response,err) => {
       return response.json()
     }).then((result) => {
       var convertArray = Object.keys(result.hot)
       convertArray.forEach(function(key){
         var articleObject = {}
         articleObject.image = result.hot[key].image;
         articleObject.name = result.hot[key].display_title;
         articleObject.category = result.hot[key].channel;
         articleObject.rating = result.hot[key].shares.total;
         articleObject.snippet = result.hot[key].excerpt;
         state.articleFeed.push(articleObject)
       })
    }).catch((err)=>{
      console.log("you made a mistake")
    })

    // fetch('https://crossorigin.me/http://sidebar.io/api')
    //   .then((response,err)=> {
    //     console.log(response)
    //   }).catch((err)=>{
    //     "something went wrong"
    //   })


  var container = document.querySelector('#container')
  var state = {
    sources : [
                {name:"source 1",url:"#"},
                {name:"source 2",url:"#"},
                {name:"source 3",url:"#"}
              ],
    currentSource: "source 1",
    articleFeed: []
  }


console.log(state.sources)

  function renderLoading(data, into) {
    into.innerHTML = `<div id="pop-up" class="loader"></div>`
  }

  function renderHeader(into,state){
    into.innerHTML = `
    <header>
    <section class="wrapper">
      <a href="#"><h1>Feedr</h1></a>
      <nav>
        <section id="search">
          <input type="text" name="name" value="">
          <div id="search-icon"><img src="images/search.png" alt="" /></div>
        </section>
        <ul>
          <li><a href="#">Reading from:${state.currentSource} <span></span></a>
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
    return `<li><a href="${item.url}">${item.name}</a></li>`
  }
  function renderNav(){

  }

  function renderPopup(data,into){
    into.innerHTML = `  <div id="pop-up">
        <a href="#" class="close-pop-up">X</a>
        <div class="wrapper">
          <h1>Article title here</h1>
          <p>
          Article description/content here.
          </p>
          <a href="#" class="pop-up-action" target="_blank">Read more from source</a>
        </div>
      </div>`
  }


  //calling functions
  renderLoading(state, container) //render the loading spinner on page load.

  setTimeout(()=>{
    renderHeader(container,state);
    console.log(state.articleFeed)
  },3000)

//  renderPopup(state,container)

})()



//on page load, show spinner
  //when default news is loaded
