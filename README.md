Feedr
========

***Feedr*** Is a personal feed reader, it utilsises the fetch API to read from 3 API's (Mashable, Reddit, Behance). Due to the CORS restrictions, the requests are being made through the crossorigin.me proxy. The application makes use of the MVC architecture to detect changes in the state and render content conditionally.

Features
---
Using Feedr is simple, when the application is loaded, the default state is also loaded (in this case the Mashable api, though this could be easily changed.) while the fetch API is getting the request, a loading spinner shows on the page, indicating to the user that the page is loading/waiting for a response from the server. If the load is successful, a list of news articles renders.
##### This list includes:
- A feautured image
- The title
- any tags/categories associated,
- A total number of social likes/shares/reaction etc.

The user can also click on an article in the list to open a pop-up dialogue, which opens up to more information, and a link to view the original post from the source.

If the fetch api fails, the user will see an error page, which gives informs the user of an error, prompts the user possible options to troubleshoot the issue.


Difficulties/Unresolved issues
------
There is an error that shows in the console whenever the delegate() event listener is interacted with, the program stil works fine, i'm not sure why this error is there. I found it very hard to find news APIs that fit the requirements, so for my 3rd API, I used the behance API and fetched a list of projects from one of my favourite designer/developer youtubers. I had no trouble working out how to pull the correct data into the pop-up, but I feel like the pop-up isn't showing very useful information, and isn't styled to my liking. I tried to impletement a overlay, so that the background would be dimmed when a pop-up is opened, but I decided it was too late to add something like that. Maybe in the future.

The process
---
I started this app the same as every app I develop, on paper. I wrote notes about the what the MVP is, also about the optional additional features. Then I wrote flow of how the app would run, which functions to use/what the functions would do.

I needed to get the relevant data from the API into my state object. For my first API, I initiaised an empty object literal and populated it with key/val pairs that made up the data I want to store, I then pushed each object to an array in the state object. Once I had the data stored, I just needed to use it when I created the article list, which using a nested view I created the container for the articles, and then used a map function to create a new article for every article in the array.. Once I had this down, I just had to do it 3 more times. I wrapped each of my fetch calls in a function so I could call each API on command.

Once I had the article list rendering, I had to work out how to do the pop-up. This stumped me at first, because I was wondering how I would get the correct data into the pop-up each time I rendered the popup. Initially, when I was created my objects of data from the API I wasn't storing an index for each item, so I worked out that if I had stored an index of each item, I could  make that index the ID of the item when I render the article list. Once I had the index stored, on each article click , I passed the ID into the renderPopup function, which I then used to find the appropriate data in the array that held my article objects.I was proud of how I managed this one.
