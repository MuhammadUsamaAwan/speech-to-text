import './style.css';

const main = document.querySelector('main') as HTMLElement;
const startButton = document.getElementById('startButton') as HTMLButtonElement;
const endButton = document.getElementById('endButton') as HTMLButtonElement;

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.interimResults = true;

const p = document.createElement('p');

recognition.addEventListener('result', e => {
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.innerText = text;
  main.appendChild(p);

  if (e.results[0].isFinal) {
    const p = document.createElement('p');
    p.innerText = text;
    main.appendChild(p);
  }

  console.log(text);
});

recognition.addEventListener('end', () => {
  startButton.disabled = false;
  endButton.disabled = true;
});

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  endButton.disabled = false;
  recognition.start();
});

endButton.addEventListener('click', () => {
  startButton.disabled = false;
  endButton.disabled = true;
  recognition.stop();
});
