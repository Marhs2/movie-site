import axios from "axios";

export async function getMovie(page, gerers) {

  try {
    const response = await axios.get(`/discover/movie`, {
      params: {
        include_adult: false,
        language: 'ko-kr',
        page: page,
        sort_by: 'popularity.desc',
        with_genres: gerers
      }
    })

    return response.data

  } catch (err) {
    return err;
  }
}

export async function getMovieById(moveId) {
  try {
    const res = await axios.get(`/movie/${moveId}?language=ko-kr`)
    return res.data
  } catch (err) {
    console.log(err);
  }
}

export async function movieSearch(searchValue, page, gerers) {
  if (!searchValue.trim()) return getMovie(page, gerers);

  try {
    const search = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        query: searchValue,
        include_adult: false,
        language: 'ko-kr',
        page: page,
        with_genres: gerers
      }
    })

    return search.data
  } catch (err) {
    return err
  }
}
