import axios from "axios";

export async function getMovie(page, gerers, langType) {
  try {
    const response = await axios.get(`/discover/movie`, {
      params: {
        include_adult: false,
        language: "ko-kr",
        page: page,
        sort_by: "popularity.desc",
        with_genres: gerers,
        with_origin_country: langType
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMovieById(moveId) {
  try {
    const res = await axios.get(`/movie/${moveId}?language=ko-kr`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function movieSearch(searchValue, page, gerers, langType) {
  if (!searchValue.trim()) return getMovie(page, gerers);

  try {
    const search = await axios.get(
      `/search/movie`,
      {
        params: {
          query: searchValue,
          include_adult: false,
          language: "ko-kr",
          page: page,
          with_genres: gerers,
          with_origin_country: langType
        },
      }
    );
    return search.data;
  } catch (err) {
    console.log(err);
  }
}


export const getWishlistId = async () => {
  try {
    const res = await axios.get('/account/22185600/watchlist/movies?language=ko-r&page=1&sort_by=created_at.asc')

    return res.data.results.map(e => e.id)
  } catch (error) {
    console.log('에러', error);
  }
}

export const getWishlist = async () => {
  try {
    const res = await axios.get('/account/22185600/watchlist/movies?language=ko-r&page=1&sort_by=created_at.asc')

    return res.data
  } catch (error) {
    console.log('에러', error);
  }
}

export const addWishlist = async (idx, isWish) => {
  try {
    const res = await axios.post('/account/22185600/watchlist',
      { media_type: 'movie', media_id: idx, watchlist: isWish }
    )

    console.log('성공: ', res.data);
  } catch (error) {
    console.log('에러', error);
  }
}

