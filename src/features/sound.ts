import UIfx from 'uifx'
import beepMp3 from 'assets/button1.mp3'
import beep2Mp3 from 'assets/button2.mp3'
import tickHorrorMp3 from 'assets/tickHorror.mp3'
import bubbleNegativeMp3 from 'assets/bubbleNegative.mp3'
import errorbuzzMp3 from 'assets/errorbuzz.mp3'
import chimeMp3 from 'assets/chime.mp3'

export const beep1 = new UIfx(beepMp3, { throttleMs: 1000})
export const beep2 = new UIfx(beep2Mp3)
export const tickHorror = new UIfx(tickHorrorMp3,{ throttleMs: 1000})

export const errorbuzz = new UIfx(errorbuzzMp3);
export const popNegative = new UIfx(bubbleNegativeMp3);
export const chime = new UIfx(chimeMp3);

