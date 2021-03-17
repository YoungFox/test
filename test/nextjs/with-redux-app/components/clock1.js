class Clock extends React.Component {
  constructor(props){
    super(props)

    this.state = {date: new Date(1111111111)}
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000);
  }

  tick(){
    this.setState({
      date: new Date()
    })
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock