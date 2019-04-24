import {createStore} from 'redux'
import {SCENE} from '../types/scene'

export interface TankStateType {
  player: 1 | 2,
  checkpoint: SCENE,
}


const initStore: TankStateType = {
  player: null,
  checkpoint: SCENE.EDITOR
};


const SET_CHECKPOINT = 'SET_CHECKPOINT';
export const actions = {
  setCheckpoint: (scene: SCENE) => ({type: SET_CHECKPOINT, scene})
};


export default createStore((store: TankStateType = initStore, action: any) => {
  switch (action.type) {
    case SET_CHECKPOINT:
      store.checkpoint = action.scene;
      break;
  }
  return store;
})