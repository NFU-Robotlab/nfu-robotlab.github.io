let audioEnabled = false;
let audioContext = null;

function ensureAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function updateAudioButton() {
  const button = document.getElementById("audio-toggle-btn");
  const icon = document.getElementById("audio-icon");
  if (!button || !icon) return;

  button.classList.toggle("is-on", audioEnabled);
  button.setAttribute("aria-pressed", String(audioEnabled));
  icon.textContent = audioEnabled ? "🔊" : "🔇";

  const label = button.querySelector("span:last-child");
  if (label) label.textContent = audioEnabled ? "音效開啟" : "音效關閉";
}

function toggleAudio() {
  if (!ensureAudioContext()) return;
  audioEnabled = !audioEnabled;
  updateAudioButton();
  if (audioEnabled) playSynth("boot");
}

function playTone({ type, startFrequency, endFrequency, volume, duration, delay = 0 }) {
  if (!audioEnabled || !audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const start = audioContext.currentTime + delay;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(startFrequency, start);
  if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function playSynth(type) {
  if (!audioEnabled || !audioContext) return;

  try {
    if (type === "hover") {
      playTone({ type: "sine", startFrequency: 1600, volume: 0.015, duration: 0.045 });
    } else if (type === "click") {
      playTone({ type: "triangle", startFrequency: 1200, endFrequency: 300, volume: 0.045, duration: 0.14 });
    } else if (type === "select") {
      playTone({ type: "triangle", startFrequency: 523.25, endFrequency: 659.25, volume: 0.05, duration: 0.2 });
    } else if (type === "boot") {
      [440, 554, 659].forEach((frequency, index) => {
        playTone({ type: "sine", startFrequency: frequency, volume: 0.025, duration: 0.3, delay: index * 0.05 });
      });
    }
  } catch (error) {
    console.warn("Audio effect unavailable", error);
  }
}

window.toggleAudio = toggleAudio;
window.playSynth = playSynth;
