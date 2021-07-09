import { useState } from 'react'
import { Drawer as Drwr } from '@material-ui/core'

const Drawer = props => {
  return (
    <Drwr anchor='left' open={props.state.left} onClose={props.toggleDrawer('left', false)}>
      {props.list('left')}
    </Drwr>
  )
}

export default Drawer
