import { BrowserRouter ,Routes, Route, useParams} from "react-router-dom";
import { Container, Grid, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from './components/navBar'
import RecipeReviewCard from './components/playlist-card-items';
import usePlayList from './hooks/usePlayList'
import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";
 


const HomePage = ({playlistArray})=>{
  //  get playlist model 
  const playlist = useStoreActions(actions => actions.playlist)
  
  useEffect(()=>{
    playlist.getPlaylistData('PL4cUxeGkcC9i5yvDkJgt60vNVWffpblB7')
  }, [])

  return (
    <Container maxWidth={'lg'} sx={{my: 16}}>
         {
          playlistArray.length > 0 && (
           <Grid container alignItems='stretch'>
            {
                playlistArray.map((item)=>(
                  <Grid item xs={12} md={6} lg={4} mb={2}>
                    <RecipeReviewCard 
                      key={item.playListId}
                      playlistThumbnails={item.playlistThumbnails}
                      playlistTitle={item.playlistTitle}
                      channelTitle={item.channelTitle}
                      playListId={item.playListId}
                    />
                  </Grid>
                ))
            }
           </Grid>
          )
         }
     </Container>
  )
}

const PlayerPage =({playLists})=>{
const { playListId } = useParams();//Returns all parameters as objects
  // console.log('params:', params); //params: {playListId: 'PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl'}

  const current = playLists[playListId];
   if(!current) return ;

  return(
    <Container maxWidth={'lg'} sx={{my: 16}}>
     <Typography align="center" variant="h4">{current.playlistTitle}</Typography>
     <Typography align="center" variant="body2">{current.playlistDescription}</Typography>
    </Container>
  ) 
}

const NotFound =()=>{
  return(
    <Container maxWidth={'lg'} sx={{my: 16}}>
      <Typography align="center" variant="h6">404 Page Not Found</Typography>
    </Container>
  )
}



const App = () => {
const {playLists, error, getPlaylistById} = usePlayList();

const playlistArray = Object.values(playLists); // playLists obj er moddhe thaka property er value gulo akta array hisebe return korbe

  return (
    <BrowserRouter>
     <CssBaseline />
       <Navbar getPlaylistById={getPlaylistById}/>
         <Routes>
          <Route path="/" element={<HomePage playlistArray={playlistArray} />} />
          <Route path="/player/:playListId" element={<PlayerPage playLists={playLists} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App