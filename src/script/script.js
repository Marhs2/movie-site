import axios from "axios";
import { langueageTypes } from "../assets/data";

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


    console.log(search.data);
    

    return search.data;
  } catch (err) {
    console.log(err);
  }
}
