import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { apiGet } from '../misc/config';
const Show = () => {
    const {id} = useParams();
    const [show, setShow] = useState(null);
    const [error,setError]=useState(null);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        let isMounted=true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            if(isMounted){
            setTimeout(() => {
                setShow(results);
                setIsLoading(false)
            }, 2000);
        }
          }).catch(error=>{
              setError(error.message);
              setIsLoading(false)
          });
       
        /*for using when component unmounts*/
        return () => {
          isMounted=false;
        }
    }, [id])
    if(isLoading){
        return <div>Data is being loaded</div>
    }
    if(error){
        return <div>Error: {error}</div>
    }
    return (
        <div>
            
        </div>
    )
}

export default Show
