import {useState} from 'react'
import ResultCard from "./ResultCard"

const Home = () => {

    const[query, setQuery] = useState('')
    const[results, setResults] = useState([])
    const onChange = (e) => {
        
        e.preventDefault()
        setQuery(e.target.value)

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=129882aa35cd44a9f03ea40193b93383&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
        .then(res => res.json())
        .then(data => {
            if(!data.errors){
                setResults(data.results)
                console.log(data.results)
            }else{
                setResults([])
            }
        })
    }
    return (
        <div>
            <div class="container">
    <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-8">
            <div class="search"> <i class="fa fa-search"></i> <input type="text" class="form-control" value={query} placeholder="Search Movies here!" onChange={onChange}/> </div>
        </div>
    </div>
</div>

        <div>
            {results.length > 0  &&(
                <ul style={{listStyle:"none"}}>
                    {results.map((movie)=> (
                        <li key={movie.id}>
                            <ResultCard movie={movie}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    )
}

export default Home
