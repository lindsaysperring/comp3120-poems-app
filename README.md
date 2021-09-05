This project utilises the [subdir buildpack](https://github.com/SectorLabs/heroku-buildpack-subdir) by SectorLabs to build and run the projects with separate directories for backend and frontend.

Buildpacks for the subdirectories are listed in the `.buildpacks` file.


# Poems Frontend

### Start react dev server
**Run the following commands in the dev server**  
* `npm start`  
* To create production build: `npm run build`

Current Features:
* API calls to express api server
* Dynamic poems pages to pull from API
* Decent styling
* Add poems page.
* Pagination
* Upvotes

### Pagination
Shows a maximum of 6 poems at a time on the landing screen. API slices to a maximum of 6 items and sends the poems along with the total number of pages with the current limit. At the moment the page size limit is set by default to 6 with no way of the user customising this.

The pagination buttons created in a loop from 1 to the totalPages number. Clicking on a number or the arrows will send an API request to the server with the requested page number

### Live Search
Allows users to search and filter poems. This uses the Fuse.js fuzzy searching library on the backend to return search results. It is configured to search the author, title and text fields and returns items that contain the search term and the threshold is below 0.3 in the Fuse.js scoring. The live search is adapted from a tutorial on digital ocean found at [https://www.digitalocean.com/community/tutorials/react-live-search-with-axios](https://www.digitalocean.com/community/tutorials/react-live-search-with-axios). This implementation cancels the previous request as the user continues typing.

# Poems Backend

### Starting the server
**Run the following commands inside the backend folder**  
* `npm run server`  
* For dev mode with nodemon: `npm run dev`

API Endpoints
* GET /api/poems - Gets poems in pages of 6 items. Query paramters: *page* (integer)
* GET /api/poems/:id - Gets poem with id
* POST /api/poems - Adds a new poem. Must be in JSON format containing the following parameters: *title*, *author*, *text*. Returns the created poem object
* POST /api/poems/:id - Adds a vote to poem with id* 

### Poem Votes
Users can vote for poems. When a poem is created or a vote is added the poems array is sorted by the number of votes. It is done this way to reduce the number of times the array is sorted as it is only done when changes are made.

### Pagination
See pagination in frontend

### Live search
See live search in frontend