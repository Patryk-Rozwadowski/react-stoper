class Stopwatch extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
        running: false,
        result: ''
      };
  }

  start() {
    if (!this.state.running) {
      this.state.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  stop() {
    this.state.running = false;
    clearInterval(this.watch);
    this.setState({
      result: <li className = "time-result" > 
        {
          this.format({
            minutes: this.state.minutes,
            seconds: this.state.seconds,
            miliseconds: this.state.miliseconds
          })
        }
       </li>
    })
  }

  reset() {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    });
    this.clearHistory();
  }

  result() {
    this.setState({
      result: < li className = "time-result" > 
        {
          this.format({
            minutes: this.state.minutes,
            seconds: this.state.seconds,
            miliseconds: this.state.miliseconds
          })
        } 
        </li>
    })
  }
  clearHistory() {
    timeHistory.innerHTML = `<li class='time-result'>Your times:</li>`;
  }

  format() {
    return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
  }

  calculate() {
    let miliseconds = this.state.miliseconds + 1;
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    this.setState({
      minutes,
      seconds,
      miliseconds
    });
  }
  
  render() {
    return (
      <main className="container">
        <section className="controls">
          <a href="#" className="button" onClick={() => {this.start()}}> Start</a>
          <a href="#" className="button" onClick={() => {this.stop()}}>Stop</a>
          <a href="#" className="button" onClick={() => {this.reset()}}>Reset</a>
          <a href="#" className="button" onClick={() => {this.result()}}>Time capture</a>
        </section>
        < div className="stopwatch" > 
        {this.format({minutes: this.state.minutes, seconds: this.state.seconds, miliseconds: this.state.miliseconds})} 
        </div>
        <ul className="results">
          <li className="time-result">Your times:</li>
          {this.state.result}
        </ul>
      </main>
    )
  }
}

const pad0 = value => {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

const app = <Stopwatch />
ReactDOM.render(app, document.getElementById('app'));