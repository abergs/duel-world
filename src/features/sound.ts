import {Howl, Howler} from 'howler';

import beepMp3 from 'assets/button1.mp3'
import beep2Mp3 from 'assets/button2.mp3'
import tickHorrorMp3 from 'assets/tickHorror.mp3'
import bubbleNegativeMp3 from 'assets/bubbleNegative.mp3'
import errorbuzzMp3 from 'assets/errorbuzz.mp3'
import chimeMp3 from 'assets/chime.mp3'

export const beep1 = new Howl({src: beepMp3});
export const beep2 = new Howl({src: beep2Mp3});
export const tickHorror = new Howl({src:tickHorrorMp3});

export const errorbuzz = new Howl({src:errorbuzzMp3});
export const popNegative = new Howl({src:bubbleNegativeMp3});
export const chime = new Howl({src:chimeMp3});

