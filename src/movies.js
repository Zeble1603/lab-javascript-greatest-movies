// The `movies` array from the file `src/data.js`.
const movies = require("./data");

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  let directors = movies.map((film)=>{
    return film.director
  })
  return [...new Set(directors)]
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  let spielbergMovies = movies.filter(film => film.director === "Steven Spielberg")
  return spielbergMovies.filter(film => film.genre.includes('Drama')).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  let len = movies.length
  if (len > 0){
    let scoreArray = movies.map((film)=>{
      return film.score || 0
    })
    let scoreSum = scoreArray.reduce((previousValue, currentValue)=> previousValue + currentValue,
    0);
  
    return Math.round((scoreSum/len) * 100) / 100
  }
  return 0
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  let dramaMovies = movies.filter(film => film.genre.includes('Drama'))
  return scoresAverage(dramaMovies)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  let newArr = JSON.parse(JSON.stringify(movies));
  let sortedNewArr = newArr.sort(function(x,y){
    return x.year - y.year || x.title.localeCompare(y.title)
  })
  return sortedNewArr
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  let newArr = JSON.parse(JSON.stringify(movies));
  let sortedNewArr = newArr.sort((a, b) => a.title.localeCompare(b.title))
  let moviesTitleArray = sortedNewArr.map((film)=>{
    return film.title
  })
  return moviesTitleArray.slice(0,20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
//other function to turn string duration to number
function turnStringDurationtoNumber(duration){
  let hours = ""
  let minutes = ""
  for (element of duration.split(" ")){
    if (element[element.length-1] === "h"){
      for(let i=0; i<element.indexOf("h"); i++){
        hours+=element[i]
      }
    }else if(element[element.length-1] === "n"){
      for(let i=0; i<element.indexOf("m"); i++){
        minutes+=element[i]
      }
    }
  }
  return (Number(hours)*60 + Number(minutes))
}

function turnHoursToMinutes(movies) {
  let newArr = JSON.parse(JSON.stringify(movies));
  for (film of newArr){
    film.duration = turnStringDurationtoNumber(film.duration)
  }
  return newArr
}


// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if (movies.length > 0){
  //we need an array of the years. We don't want duplicate values
  let yearsArraySet = [... new Set(movies.map((film)=>{
    return film.year
  }))]
  //we need an array that will contain all years with their average rate
  let averageYear = []
  //iteration
  for (year of yearsArraySet){
    //we create a list of movie for each year
    let arrayOfMoviesPerYear = movies.filter(film=>film.year===year)
    //we do the average of the rates
    //to do so, we need a new list, and we'll reduce it
    let sum = arrayOfMoviesPerYear.map((film)=>{
      return film.score
    }).reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    let average = Math.round((sum / arrayOfMoviesPerYear.length) * 100) / 100
    //we then create and push to averageYear an object that contains the year and its average rate.
    averageYear.push({
      year:year,
      averageRate:average
    })
  }
  let sortedAverageYear = averageYear.sort(function(x,y){
    return y.averageRate - x.averageRate  || x.year - y.year
  })
  return `The best year was ${sortedAverageYear[0].year} with an average score of ${sortedAverageYear[0].averageRate}`
  }
  return null
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
