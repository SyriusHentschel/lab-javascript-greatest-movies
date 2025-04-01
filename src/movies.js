// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  // Using map to extract the director property from each movie object
  const directors = moviesArray.map(movie => movie.director);

  // Bonus: Remove duplicates using Set
  // const uniqueDirectors = [...new Set(directors)];
  // return uniqueDirectors;

  return directors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  // Check if the array is empty
  if (!moviesArray || moviesArray.length === 0) {
    return 0;
  }

  // Filter movies directed by Steven Spielberg and containing "Drama" in the genre array
  const spielbergDramaMovies = moviesArray.filter(movie => {
    return movie.director === 'Steven Spielberg' && movie.genre.includes('Drama');
  });

  return spielbergDramaMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  // Check if the array is empty
  if (!moviesArray || moviesArray.length === 0) {
    return 0;
  }

  // Use reduce to sum all scores
  const totalScore = moviesArray.reduce((sum, movie) => {
    // Handle movies without a score
    if (movie.score === undefined || movie.score === null) {
      return sum;
    }
    return sum + movie.score;
  }, 0);

  // Calculate the average and round to 2 decimal places
  const average = totalScore / moviesArray.length;
  return Number(average.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  // Check if the array is empty
  if (!moviesArray || moviesArray.length === 0) {
    return 0;
  }

  // Filter drama movies
  const dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'));

  // If no drama movies found, return 0
  if (dramaMovies.length === 0) {
    return 0;
  }

  // Calculate the average score of drama movies
  const totalScore = dramaMovies.reduce((sum, movie) => sum + movie.score, 0);
  const average = totalScore / dramaMovies.length;

  return Number(average.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  // Check if the array is empty
  if (!moviesArray || moviesArray.length === 0) {
    return [];
  }

  // Create a copy of the array to avoid modifying the original
  const moviesCopy = [...moviesArray];

  // Sort the copy by year, and if years are equal, sort by title
  return moviesCopy.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    } else {
      return a.title.localeCompare(b.title);
    }
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  // Check if the array is empty
  if (!moviesArray || moviesArray.length === 0) {
    return [];
  }

  // Create a copy of the array with only the titles
  const titlesCopy = moviesArray.map(movie => movie.title);

  // Sort the titles alphabetically
  const sortedTitles = titlesCopy.sort((a, b) => a.localeCompare(b));

  // Return only the first 20 titles (or all if less than 20)
  return sortedTitles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  // Check if the array is empty
  if (!moviesArray || moviesArray.length === 0) {
    return [];
  }

  // Create a deep copy of the array to avoid modifying the original
  return moviesArray.map(movie => {
    // Create a new movie object with all properties from the original
    const newMovie = { ...movie };

    // Convert duration from string to minutes
    if (typeof movie.duration === 'string') {
      const durationString = movie.duration;
      let totalMinutes = 0;

      // Extract hours if present
      const hoursMatch = durationString.match(/(\d+)h/);
      if (hoursMatch) {
        totalMinutes += parseInt(hoursMatch[1]) * 60;
      }

      // Extract minutes if present
      const minutesMatch = durationString.match(/(\d+)min/);
      if (minutesMatch) {
        totalMinutes += parseInt(minutesMatch[1]);
      }

      // Update the duration property with the calculated minutes
      newMovie.duration = totalMinutes;
    }

    return newMovie;
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  // Check if the array is empty
  if (!moviesArray || moviesArray.length === 0) {
    return null;
  }

  // Create an object to store the sum of scores and count of movies for each year
  const yearStats = {};

  // Populate the yearStats object
  moviesArray.forEach(movie => {
    const year = movie.year;

    if (!yearStats[year]) {
      yearStats[year] = {
        sum: 0,
        count: 0
      };
    }

    yearStats[year].sum += movie.score;
    yearStats[year].count += 1;
  });

  // Calculate the average score for each year
  const yearAverages = {};
  for (const year in yearStats) {
    yearAverages[year] = yearStats[year].sum / yearStats[year].count;
  }

  // Find the year with the highest average score
  let bestYear = null;
  let bestAverage = -1;

  for (const year in yearAverages) {
    if (yearAverages[year] > bestAverage) {
      bestAverage = yearAverages[year];
      bestYear = year;
    } else if (yearAverages[year] === bestAverage && parseInt(year) < parseInt(bestYear)) {
      // If there's a tie, choose the earlier year
      bestYear = year;
    }
  }

  // Format the result string with the average rounded to 2 decimal places
  return `The best year was ${bestYear} with an average score of ${bestAverage.toFixed(2)}`;
}
