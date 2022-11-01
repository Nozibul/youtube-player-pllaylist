import { useEffect, useState } from "react";
import getPlaylist from "../api";
import storage from "../utils/Storage";

const STORAGE_KEY = 'youtube_playlist_state'

const INIT = {
    playLists:{},
    recentPlayLists:[],
    favorites:[],
  }

const usePlayList = () => {
  const [state, setState] = useState(INIT);

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

                        // localStorage
// The first usePlaylist hooks is called in the app.js file 
// So we will use localStores inside the usePlaylist.
// And storage class call and see if I have data, if there is data then that will be my state.
// Since the load factor only happens once, we can use the useEffect hook.
useEffect(()=>{
    const loState = storage.get(STORAGE_KEY);
    if(loState){
    setState({...loState}); // We need to take the help of use effect to save the data that we got 
    }
}, []);

// We need to take the help of use effect to save the data that we got
useEffect(()=>{
   if(state !== INIT){
    storage.save(STORAGE_KEY, state);
   }
}, [state])



 const getPlaylistById = async (playListId, refresh=false)=>{
    if(state.playLists[playListId] && !refresh){
        return ;
    }

   
    setLoading(true);
    try{
       const playlist = await getPlaylist(playListId);
        setError('');
        setState((prev)=> ({
            ...prev,
            playLists:{
                ...prev.playLists,
                [playListId]: playlist,
            },
        }))
    }catch(e){
        setError(e?.response?.data?.error?.message || "Something Went Wrong");
    }finally{
        setLoading(false);
    }
}

const addToFavorites = (playListId) =>{
    setState(prev=>({
        ...prev,
        favorites:[...prev, playListId]
    })) 
}

const addRecent = (playListId) =>{
    setState(prev=>({
        ...prev,
        recentPlayLists:[...prev, playListId],
    }));
}

const getPlayListById=(ids=[])=>{
    return ids.map(id=> state.playLists[id]);
}


return {
    playLists: state.playLists,
    favorites: getPlayListById(state.favorites),
    recentPlayLists: getPlayListById(state.recentPlayLists),
    getPlaylistById,
    addRecent,
    addToFavorites,
    error,
    loading
 }

}

export default usePlayList;


