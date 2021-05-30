import {useReducer,useEffect} from 'react'
function usePersistedReducer(reducer, initialState, key){

    function showsReducer (prevState,action){
        switch(action.type){
        case 'ADD':{
            return [...prevState,action.showId]
        }
        case 'REMOVE':{
            return prevState.filter( (showId) => showId!==action.showId );
        }
        default:return prevState;
    }
    }

    /* third arg takes second arg and computes and use it as the initial state */
    const [state,dispatch]= useReducer(reducer,initialState,(initial)=>{
        const persisted=localStorage.getItem(key)
        return persisted ? JSON.parse(persisted) :initial;
        
    }
    
        )
        /* to synchronize with localStorage */
        useEffect(() => {
           localStorage.setItem(key,JSON.stringify(state))
            }, [state,key])
    return [state,dispatch]
}

export function useShows(key='shows'){
    return usePersistedReducer(showsReducer,[],key);
}