import { action , thunk} from 'easy-peasy'
import getPlaylist from '../api'

const playlistModel = {
    data:{},
    error: '',
    isLoading: false ,
    

    setError: action((state, payload)=>{
        state.error = payload ;
    }),

    setLoading: action((state, payload)=>{
        state.isLoading = payload ;
    }),

    // set data in playlist using action
    setPlaylistData: action((state, payload)=>{
        state.data[payload.playListId] = payload; // playlist data
    }),
  
   // get data form playlist using thunk .
   // Where I call getPlaylistData function, I will get a playlist ID as an argument, 
   // which I will receive in getPlaylistData function as payload.
    getPlaylistData: thunk( async ({setPlaylistData, setLoading, setError}, playListId , {getState})=>{
        if(getState().data[playListId]){
            return ; 
        }
       
         setLoading(true) ;
        try{
           const playlist = await getPlaylist(playListId);
           setPlaylistData(playlist) ;
        } catch (err){
            setError(e?.response?.data?.error?.message || "Something Went Wrong");
        } finally{
            setLoading(false);
        }

    })   
};

export default playlistModel ;

