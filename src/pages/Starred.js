import React, { useState,useEffect } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid'
import { apiGet } from '../misc/config'
import { useShows } from '../misc/custom-hooks'

const Starred = () => {
    const [starred]= useShows()
    const [show,setShow] = useState(null)
    const [isLoading,setisLoading]=useState(true)
    const[error,setError]=useState(null)

    useEffect(() => {
        if(starred && starred.length>0){
            const promises =starred.map(showId => apiGet(`/shows/${showId}`))
            Promise.all(promises)
            .then(apiData => apiData.map(show=>({show})))
            .then(results=>{              
                setShow(results)
                setisLoading(false);
            }).catch(err=>{
                setError(err.message)
                setisLoading(false)
            })

        }
        else{
            setisLoading(false);
        }
    }, [starred])
    return (

        <MainPageLayout>
            {isLoading && <div>Loading</div>}
            {error && <div>Error:{error}</div>}
            {!isLoading && !show && <div>No starred shows</div>}
            {!isLoading && !error && show && <ShowGrid data={show}/>}
        </MainPageLayout>
    )
}

export default Starred
