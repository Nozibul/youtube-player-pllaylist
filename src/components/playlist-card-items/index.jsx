import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Button, Stack } from '@mui/material';
import { PlayCircleOutline} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';



const RecipeReviewCard =({playlistThumbnails, playlistTitle ,channelTitle, playListId})=> {
 
  return (
    <Card sx={{height:'100%', display:'flex', flexDirection:'column' , margin: 1}}>
      <CardMedia
        component="img"
        image={playlistThumbnails.url}
        alt={playlistTitle}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
           { playlistTitle && (
             playlistTitle.length > 50 ? playlistTitle.substr(0, 50) + '...' 
             : playlistTitle )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           {channelTitle}
        </Typography>
      </CardContent> 

      <Box sx={{flexGrow: 1}}></Box>

      <CardActions disableSpacing>
        <Button to={`player/${playListId}`} component={RouterLink}>
          <Stack direction={'row'} spacing={1} >
            <PlayCircleOutline />
            <Typography variant='body2' fontWeight={600}>Play Tutorial</Typography>
          </Stack>
        </Button>
      </CardActions>
    </Card>
  );
}

export default RecipeReviewCard ;