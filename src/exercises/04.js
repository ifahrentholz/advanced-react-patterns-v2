import React from 'react'
import {Switch} from '../switch'

function ToggleChild({on, toggle}) {
  return (
    <div>
      {on ? 'The button is on' : 'The button is off'}
      <Switch on={on} onClick={toggle} />
      <hr />
      <button aria-label="custom-button" onClick={toggle}>
        {on ? 'Ausschalten' : 'Einschalten'}
      </button>
    </div>
  )
}

class Toggle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      on: false
    }
  }

  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      }
    )

  /**
   * @returns {{on: boolean, toggle: (function(): void)}}
   */
  getStateAndHelpers() {
    return {on: this.state.on, toggle: this.toggle}
  }

  /**
   * @returns {*}
   */
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

function Usage({onToggle = (...args) => console.log('onToggle', ...args)}) {
  return (
    <Toggle onToggle={onToggle}>
      {/* {({on, toggle}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'Ausschalten' : 'Einschalten'}
          </button>
        </div>
      )} */}
      {props => <ToggleChild {...props} />}
    </Toggle>
  )
}
Usage.title = 'Render Props'

export {Toggle, Usage as default}
