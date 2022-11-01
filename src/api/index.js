import axios from "axios";

const key = import.meta.env.VITE_YOUTUBE_API_KEY;
 

const getPlaylistItem = async (playListId, pageToken='', result=[]) => { 
const URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${key}&part=id%2CcontentDetails%2Csnippet&maxResults=50&playlistId=${playListId}&pageToken=${pageToken}`


const {data} = await axios.get(URL);
result = [...result, ...data.items];
if(data.nextPageToken){
  result = await getPlaylistItem(playListId, data?.nextPageToken, result);
}
  return result; 
};

const getPlaylist = async (playListId) =>{
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?key=${key}&part=snippet&id=${playListId}`
  const { data } = await axios.get(URL);
  const {title:playlistTitle, channelId, description:playlistDescription, thumbnails, channelTitle} = data?.items[0]?.snippet

  let playlistItems = await getPlaylistItem(playListId); //get single video details find.
  playlistItems = playlistItems?.map((item)=> {
    const {title, description, thumbnails: { high }} = item.snippet;
    return {
            title, description,  thumbnail: high,
            contentDetails: item.contentDetails,
        };
  });


  return {  
    playListId,
    playlistTitle, 
    channelTitle,
    channelId,
    playlistDescription, 
    playlistThumbnails:thumbnails.default,
    playlistItems, 
  }
}

export default getPlaylist;