import * as React from 'react'

interface InitialProps {
  size: number
  colour: number[]
  scope: Window
}

interface State {
  hidden: boolean
  drag: boolean
  animating: boolean
  removeOnMouseUp: boolean
  animation: string
  x: number
  y: number
}

class Ripple extends React.Component<InitialProps, State> {
  static defaultProps = {
    size: 50,
    colour: [135, 206, 250],
    scope: window
  }

  showEvents = ['mousedown', 'mousemove', 'touchstart', 'touchmove']
  hideEvents = ['animationend', 'mouseup', 'touchend']
  pointer: any

  state = {
    hidden: true,
    animating: false,
    animation: 'rippleFadeIn',
    drag: false,
    removeOnMouseUp: false,
    x: 0,
    y: 0
  }

  constructor(props: InitialProps) {
    super(props)
    this.showRipple = this.showRipple.bind(this)
    this.hideRipple = this.hideRipple.bind(this)
  }

  getPointer() {
    let {scope, children} = this.props
    return children ? this.pointer : scope
  }

  injectKeyFrames() {
    let newStyleSheet = document.createElement('style')

    const keyframes = `@keyframes rippleFadeIn {
      from {
        transform: scale(0.8);
        opacity: 0.2;
      }
      to {
        transform: scale(1);
        opacity: 0.6;
      }
    }

    @keyframes fadeOut {
      from {
        transform: scale(1);
        opacity: 0.6;
      }
      to {
        transform: scale(1);
        opacity: 0.2;
      }
    }
    `;

    newStyleSheet.innerHTML = keyframes
    document.body.prepend(newStyleSheet)
  }

  componentDidMount() {
    this.injectKeyFrames()
    this.addEventListener()
  }

  componentWillUnmount() {
    this.removeEventListener()
  }

  addEventListener() {
    const pointer = this.getPointer()
    let drag = {isDrag: false}
    this.showEvents.forEach(event => pointer.addEventListener(event, this.showRipple))
    this.hideEvents.forEach(event => pointer.addEventListener(event, this.hideRipple))
  }

  removeEventListener() {
    const pointer = this.getPointer()
    this.showEvents.forEach(event => pointer.removeEventListener(event, this.showRipple))
    this.hideEvents.forEach(event => pointer.removeEventListener(event, this.hideRipple))
  }

  showRipple(e: any) {
    let {pageX, pageY} = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || e

    if (e.type === 'mousemove' || e.type === 'touchmove') {
      this.state.drag && this.setState({x:pageX, y:pageY})
    } else {
      this.setState({drag: true, animating: true, hidden: false, animation: 'rippleFadeIn', x:pageX, y:pageY})
    }
  }

  hideRipple(e: any) {
    if (e.type === 'animationend' && e.animationName === 'rippleFadeIn' && !this.state.drag) {
      this.setState({hidden: false, drag: false, animating: true, animation: 'fadeOut'})
    } else if (e.type === 'animationend' && e.animationName === 'fadeOut') {
      this.setState({hidden: true, animating: false, animation: 'rippleFadeIn', removeOnMouseUp: false})
    } else if ((e.type === 'mouseup' || e.type === 'touchend') && !this.state.animating) {
      this.setState({hidden: true, drag: false, animating: false})
    } else if (e.type === 'animationend' && e.animationName === 'rippleFadeIn' && this.state.drag) {
      this.setState({removeOnMouseUp: true})
    } else if ((e.type === 'mouseup' || e.type === 'touchend') && this.state.removeOnMouseUp) {
      this.setState({hidden: false, drag: false, animating: true, animation: 'fadeOut'})
    } else if (e.type === 'mouseup' || e.type === 'touchend') {
      this.setState({drag: false})
    }
  }

  render() {
    const {hidden, x, y, animation} = this.state
    const {children, size, colour} = this.props

    const style: React.CSSProperties = {
      display: hidden ? 'none' : 'block',
      top: y,
      left: x,
      position: 'absolute',
      width: size,
      height: size,
      background: `rgba(${colour[0]},${colour[1]},${colour[2]},0.1)`,
      textAlign: 'center',
      marginTop: -(size / 2),
      marginLeft: -(size / 2),
      zIndex: 999,
      borderRadius: '100%',
      border: `1.5px solid rgba(${colour[0]},${colour[1]},${colour[2]},0.8)`,
      animationName: animation,
      animationTimingFunction: 'ease-out',
      animationDuration: animation === 'rippleFadeIn' ? '0.1s' : '0.1s',
      animationDelay: '0.0s',
      animationIterationCount: 1,
      animationDirection: 'normal',
      animationFillMode: 'forwards',
      pointerEvents: 'none'
    }

    return (<div ref={elem => this.pointer = elem}>
      <span style={style} />
      {children}
    </div>)
  }
}

export default Ripple
