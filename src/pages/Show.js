import React,{useEffect,useReducer} from 'react'
import {useParams} from 'react-router-dom'
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';
const Show = () => {
    const {id} = useParams();

    const reducer = (prevState,action) => {
        switch(action.type){
            case 'FETCH_SUCCESS':{
                return {...prevState,isLoading:false,show:action.show}
            }
            case 'FETCH_FAILED':{
                return {...prevState,isLoading:false,error:action.error}
            }
            default:
                return null
        }

    }
 /*    const [show, setShow] = useState(null);
    const [error,setError]=useState(null);
    const [isLoading, setIsLoading] = useState(true) */
    const initialState={
        show:null,
        isLoading:true,
        error:null
    }

    const[{show,isLoading,error},dispatch]= useReducer(reducer,initialState)
    useEffect(() => {
        let isMounted=true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            if(isMounted){
                dispatch({type:'FETCH_SUCCESS',show:results})
        }
          }).catch(error=>{
            dispatch({type:'FETCH_FAIL',error:error.message})

             /*  setError(error.message);
              setIsLoading(false) */
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
            <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.tags}/>
            <div>
                <h2>Details</h2>
                <Details status={show.status} network={show.network} premiered={show.premiered}/>
            </div>
            <div>
                <h2>Seasons</h2>
                <Seasons seasons={show._embedded.seasons}/>
            </div>
            <div>
                <h2>Cast </h2>
                <Cast cast={show._embedded.cast}/>
            </div>
        </div>
    )
}

export default Show
