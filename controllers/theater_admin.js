
const theater_DAO = require("../DataAcess/theater_dao");
const show_DAO = require("../DataAcess/show_dao");
const screen_DAO = require("../DataAcess/screen_dao");
const movie_DAO=require("../DataAcess/movie_dao")


exports.get_shows = async (req, res) => {
    const{theater_id}=req.body;
    const shows = await show_DAO.getShows_by_theater_id(theater_id);
    res.send(shows)
}

exports.get_show_movie= async (req, res) => {
    const {movie}=req.body;
    const shows = await show_DAO.getShows_by_movie_id(movie);
    res.send(shows)
}


exports.Add_screen= async (req, res) => {
    const {theater_id,Screen_num,grid}=req.body;
    //const screen = await screen_DAO.addScreen(theater_id,Screen_num);
    //res.send(screen)
    let temp=65;
    for(let i=0;i<grid.length;i++){    
        let row=String.fromCharCode(temp++)
        let col=1;
        let count=1;
        for(let j=0;j<grid[i].length;j++){
            if(grid[i][j].isSeat==true)
            {
                grid[i][j].id=row+count
                count++
            }
        }   
    }
    const screen=await screen_DAO.addScreen(theater_id,Screen_num,grid)
    res.send(screen)
}


exports.Get_screen= async (req, res) => {
    const {theater_id,screen_num}=req.body;
    const screens = await screen_DAO.getscreen(theater_id,screen_num);
    res.send(screens)
}
 async function Get_grid(theater_id,screen_num)  {
    const grid = await screen_DAO.getSeats(theater_id,screen_num);
    return grid
    
}

exports.Add_show = async (req, res) => {
    const {movie_id, theater_id, date,time, screen,price} = req.body;
    console.log(date);
    const d=new Date(date);
    const newdate=new Date();
    console.log(d);
    newdate.setUTCDate(d.getDate());
    newdate.setUTCMonth(d.getMonth());
    newdate.setUTCFullYear(d.getFullYear());
    newdate.setUTCHours(parseInt(time.split(":")[0]));
    newdate.setUTCMinutes(parseInt(time.split(":")[1]));
    console.log(newdate)
    const seats=0
    const grid=await Get_grid(theater_id,screen)
    const show = await show_DAO.addShow(movie_id, theater_id, newdate,time, screen,price,seats,grid)
    const movie=await movie_DAO.changeStatus(movie_id)
    res.send(show)
}

exports.Get_show=async (req, res) => {
    const {show_id}=req.params;
    const show = await show_DAO.getShow_by_id(show_id);
    res.send(show)
}
exports.Get_theater_Details=async (req, res) => {
    const theater_id=req.params.theaterid;
    const theater = await theater_DAO.gettheater(theater_id);
    res.send(theater)
}




