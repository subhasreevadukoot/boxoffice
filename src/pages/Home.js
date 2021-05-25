import React,{useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'
import {apiGet} from '../misc/config'
const Home = () => {
    const [input,setInput]=useState('');
    const [results,setResults]=useState('');
    const onInputChange = (e)=>{
        setInput(e.target.value);
    }
    const onSearch = () =>{
        apiGet(`/search/shows?q=${input}`).then(response =>response.json())
        .then(result=>{
            setResults(result)
        })
      
       
    }
    const onKeyDown=(e)=>{
        if (e.keyCode ===13){
            onSearch();
        }
    }
    const renderResults = () =>{
        if(results && results.length===0){
            return <div>No results</div>
        }
        else if (results && results.length>0){
            return <div>{results.map((item)=><div key={item.show.id}>{item.show.name}</div>)}</div>
        }
        return null
    }
    return (
       <MainPageLayout>
          <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
          <button type='button' onClick={onSearch}>Search</button>
          {renderResults()}
       </MainPageLayout>
    )
}

export default Home;