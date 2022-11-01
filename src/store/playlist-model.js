import { action , thunk} from 'easy-peasy'
import getPlaylist from '../api'

const playlistModel = {
    items:[],
    id:'',
    title: '', 
    channelTitle: '',
    channelId: '',
    description: '', 
    thumbnails: '',

    // set data in playlist using action
    setPlaylistData: action((state, payload)=>{
        state = {...payload} ;
        return state ;

     /*state.id = payload.id ;
       state.items = payload.items ; 
       state.title = payload.title ;
     */

    }),
 
   // get data form playlist using thunk .
   // Where I call getPlaylistData function, I will get a playlist ID as an argument, 
   // which I will receive in getPlaylistData function as payload.
    getPlaylistData: thunk( async ({setPlaylistData}, payload)=>{
       const {
        playListId,
        playlistTitle, 
        channelTitle,
        channelId,
        playlistDescription, 
        playlistThumbnails,
        playlistItems, 
       } = await getPlaylist(payload);

       //I will leave this data in the state
       setPlaylistData({
        items: playlistItems,
        id: playListId,
        title: playlistTitle, 
        channelTitle: channelTitle,
        channelId: channelId,
        description:  playlistDescription, 
        thumbnails: playlistThumbnails,
       }) ;

    })   
}

export default playlistModel ;