import * as React from 'react'
import {SCENE} from '../types/scene'
import Select from './select'
import Checkpoint from './checkpoint'
import Editor from './Editor'

export default {
  [SCENE.SELECT_PLAYER]: <Select/>,
  [SCENE.EDITOR]: <Editor/>,
  [SCENE.CHECKPOINT_1]: <Checkpoint id={SCENE.CHECKPOINT_1}
                                    key={SCENE.CHECKPOINT_1}
                                    objects={require('../config/scene/scene-1.js')}/>
}