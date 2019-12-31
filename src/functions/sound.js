const sounds = {
	alarm: {
		url: "statics/alarm.mp3"
	}
};

const soundContext = new AudioContext();

for (const key in sounds) {
	loadSound(key);
}

function loadSound(name) {
	const sound = sounds[name];

	const url = sound.url;
	// const buffer = sound.buffer;

	const request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";

	request.onload = function() {
		soundContext.decodeAudioData(request.response, function(newBuffer) {
			sound.buffer = newBuffer;
		});
	};

	request.send();
}

export default function playSound(name, options) {
	const sound = sounds[name];
	const soundVolume = sounds[name].volume || 1;

	const buffer = sound.buffer;
	if (buffer) {
		const source = soundContext.createBufferSource();
		source.buffer = buffer;

		const volume = soundContext.createGain();

		if (options) {
			if (options.volume) {
				volume.gain.value = soundVolume * options.volume;
			}
		} else {
			volume.gain.value = soundVolume;
		}

		volume.connect(soundContext.destination);
		source.connect(volume);
		source.start(0);
	}
}
