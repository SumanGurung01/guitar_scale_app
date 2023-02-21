import { notes } from "./notes"

var majorScale = []
var minorScale = []

var majorNote = []
var minorNote = []

const pattern = {
    "major": ['w', 'w', 'h', 'w', 'w', 'w', 'h'],
    "minor": ['w', 'h', 'w', 'w', 'h', 'w', 'w'],
    "M": ["Major", "Minor", "Minor", "Major", "Major", "Minor", "Dim", "Major"],
    "m": ["Minor", "Dim", "Major", "Minor", "Minor", "Major", "Major", "Minor"]
}

const scale = (base) => {

    var loc = 0;

    majorScale = []
    minorScale = []
    majorNote = []
    minorNote = []

    // find the index of root 
    notes.forEach((note, index) => {
        if (note === base) {
            loc = index;
        }
    })

    majorScale.push(notes[loc]);
    minorScale.push(notes[loc]);

    pattern.major.forEach((step) => {
        if (step === 'w') {
            if (loc == notes.length - 1) {
                loc = 1;
                majorScale.push(notes[loc]);
            } else if (loc == notes.length - 2) {
                loc = 0;
                majorScale.push(notes[loc]);
            } else {
                loc = loc + 2;
                majorScale.push(notes[loc]);
            }
        } else {
            if (loc == notes.length - 1) {
                loc = 0;
                majorScale.push(notes[loc]);
            } else {
                loc = loc + 1;
                majorScale.push(notes[loc]);
            }
        }
    })

    pattern.minor.forEach((step) => {
        if (step === 'w') {
            if (loc == notes.length - 1) {
                loc = 1;
                minorScale.push(notes[loc]);
            } else if (loc == notes.length - 2) {
                loc = 0;
                minorScale.push(notes[loc]);
            } else {
                loc = loc + 2;
                minorScale.push(notes[loc]);
            }
        } else if (step === 'h') {
            if (loc == notes.length - 1) {
                loc = 0;
                minorScale.push(notes[loc]);
            } else {
                loc = loc + 1;
                minorScale.push(notes[loc]);
            }
        }
    })

}

export const keyChord = (base) => {

    if (base === '') {
        return {
            majorScale: [],
            minorScale: []
        }
    }

    scale(base)

    pattern.M.forEach((key, index) => {
        majorScale[index] = `${majorScale[index]} ${key}`
    })

    pattern.m.forEach((key, index) => {
        minorScale[index] = `${minorScale[index]} ${key}`
    })

    return {
        majorScale: majorScale,
        minorScale: minorScale
    }
}

export const keyNote = (base) => {

    if (base === '') {
        return {
            majorNote: [],
            minorNote: []
        }
    }

    scale(base)

    majorNote.push(majorScale[0])
    majorNote.push(majorScale[2])
    majorNote.push(majorScale[4])

    minorNote.push(minorScale[0])
    minorNote.push(minorScale[2])
    minorNote.push(minorScale[4])

    return {
        majorNote: majorNote,
        minorNote: minorNote
    }
}






