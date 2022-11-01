import { createStore, persist } from 'easy-peasy';
import playlistModel from './playlist-model';

const store = createStore(persist({
  playlist: playlistModel
}));

export default store ;