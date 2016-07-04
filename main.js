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

   fetch('https://crossorigin.me/http://mashable.com/stories.json')
     .then((response,err) => {
       return response.json()
     }).then((result) => {
       console.log(result.hot[0])
       console.log(result.hot[0].id)
       console.log(result.hot[0].title)
    }).catch((err)=>{
      console.log("you made a mistake")
    })


  var container = document.querySelector('#container')
  var state = {
    sources : [
                {name:"source 1",url:"#"},
                {name:"source 2",url:"#"},
                {name:"source 3",url:"#"}
              ],
    currentSource: "source 1"
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
  },3000)

//  renderPopup(state,container)

})()



//on page load, show spinner
  //when default news is loaded
