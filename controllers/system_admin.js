const { default: axios } = require("axios");
const { response } = require("express");
const Movie_DAO=require("../DataAcess/movie_dao")


exports.Add_movie = async(req,res,next) => {
    const{movie_id} = req.body;
    try{
      axios.get("https://api.themoviedb.org/3/movie/671?api_key=129882aa35cd44a9f03ea40193b93383&language=en-US")
      .then(response=>{
        console.log(response.data);
        const poster=response.data.poster_path
        const runtime=response.data.runtime
        const movie=Movie_DAO.addmovie(response.data.title,response.data.release_date,response.data.backdrop_path,response.data.id,
          response.data.overview,response.data.genres,"unreleased",response.data.vote_average,response.data.vote_count,poster,runtime)
          console.log(response.data.overview);
      })
        
    } catch(err){
       next(err)
    }
}