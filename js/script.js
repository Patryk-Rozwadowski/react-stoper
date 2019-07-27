class Stopwatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      running: false,
      result: [],
      time: 0
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
    this.result();
  }

  reset() {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      result: '0:00:00'
    });
    this.result();
  }

  result() {
    const x = `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
    const times = [...this.state.result, TimesResult];
    this.setState({
      result: times,
      time: x
    })
  }

  timeList() {
    let miliseconds = this.state.miliseconds;
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;

    this.setState({
      time: miliseconds,seconds,minutes
    })
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
          <a href="#" className="button" onClick={() => { this.start() }}> Start</a>
          <a href="#" className="button" onClick={() => { this.stop() }}>Stop</a>
          <a href="#" className="button" onClick={() => { this.reset() }}>Reset</a>
          <a href="#" className="button" onClick={() => { this.result() }}>Time capture</a>
        </section>
        < div className="stopwatch" >
          {this.format({ minutes: this.state.minutes, seconds: this.state.seconds, miliseconds: this.state.miliseconds })}
        </div>
        <ul className="results">
          <li className="time-result">Your times:</li>
          {this.state.result.map((TimesResult, index) => <TimesResult key={index} time={this.state.time} />)}
        </ul>
      </main>
    )
  }
}
const TimesResult = ({ time }) => <li className="time-result">{time}</li>
const pad0 = value => {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

const app = <Stopwatch />
ReactDOM.render(app, document.getElementById('app'));