`npm run serve` to run server project 

# How to run

npm run serve

# Locally with docker
1. `docker-compose up`

App will be avaliable at:

http://localhost:4000/


## Endpoints

#### Method GET:

`/api/movies` - return all movies

`/api/moviesByParams` - it takes two optional parameters

{
    duration: 'string',
    genres: 'required|array', // -> array of predefined strings (from file db.json)
} 


With both parameters, returns a list of movies of the given genres and duration

Without any parameter, returns a random movie.

Without genres parameter, return random movie in duration length +/- 10

#### Method POST:

`/movies`

Add films to file. Body as application/json:


#### Array of predefined strings:

`  [
       "Comedy",
       "Fantasy",
       "Crime",
       "Drama",
       "Music",
       "Adventure",
       "History",
       "Thriller",
       "Animation",
       "Family",
       "Mystery",
       "Biography",
       "Action",
       "Film-Noir",
       "Romance",
       "Sci-Fi",
       "War",
       "Western",
       "Horror",
       "Musical",
       "Sport"
   ]`

Data types and required:

{

    genres: 'required|array',
    title: 'required|string|max:255',
    year: 'required|number',
    runtime: 'required|number',
    director: 'required|string|max:255',
    actors: 'optional|string',
    plot: 'optional|string',
    posterUrl: 'optional|string'
  
}

example:

{

	genres: ["Drama"],
	title: "Test title",
	year: 2020,
	runtime: 110,
	director: "Adam"
	
}
