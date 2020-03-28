const {
    'web-midi-player': { default: MidiPlayer }
} = window;

const MIDI_ERROR = 'MIDI_ERROR';

let midiPlayer = null;

midiPlayer = new MidiPlayer({ logging: true, patchUrl: 'patches/' });

const songElements = document.getElementsByClassName('Player__Song');

Array.from(songElements).forEach(songElement => {
    songElement.onclick = () => {
        Array.from(songElements).forEach(sgElem => {
            sgElem.style.fontWeight = null;
        });
        songElement.style.fontWeight = 'bold';
        midiPlayer.play({ url: `./vfs/${songElement.id}` });
    };
});

const buttonElements = document.getElementsByClassName('Player__Button');

Array.from(buttonElements).forEach(buttonElement => {
    buttonElement.onclick = () => {
  
  		if (buttonElement.title === "Play track")
			midiPlayer.play();
			
  
		if (buttonElement.title === "Pause track")
			midiPlayer.pause();
			
		if (buttonElement.title === "Resume track")
  			midiPlayer.resume();
  		if (buttonElement.title === "Stop track")
  			midiPlayer.stop();	
    };
});
