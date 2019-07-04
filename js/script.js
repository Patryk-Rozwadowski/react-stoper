const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

const timeButton = document.getElementById('time-capture');
timeButton.addEventListener('click', () => stopwatch.result());


const timeHistory = document.querySelector('.results');

class Stopwatch {

  constructor(display) {
    this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
    this.running = false;
    this.display = display;
    this.print(this.times);
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
    this.result();
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.print();
    this.clearHistory();
  }

  result() {
    timeHistory.innerHTML += `<li class='time-result'>${this.format(this.times)}</li>`;
  }

  clearHistory() {
    timeHistory.innerHTML = `<li class='time-result'>Your times:</li>`;
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}
