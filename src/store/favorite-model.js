import { action , thunk} from 'easy-peasy'

const favoriteModel ={
  items: [],

  addFavorite: action((state, playlistId)=>{
    state.items = state.items.filter((pId)=> playlistId !== pId)
  })
};