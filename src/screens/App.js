import React, { useState, useEffect } from 'react'
import "../styles/App.css"
import logo from "../assets/logo.jpg"
import { notes } from '../lib/notes.js'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { keyChord, keyNote, chordNote } from '../lib/music';

function App() {

  const [rootNote, setRootNote] = useState('');

  const [noteList, setNoteList] = useState({})
  const [chordList, setChordList] = useState({})
  const [chordNoteList, setChordNoteList] = useState({})

  const handleChange = (event) => {
    setRootNote(event.target.value);
  };

  useEffect(() => {
    setNoteList(keyNote(rootNote))
    setChordList(keyChord(rootNote))
  }, [rootNote])

  return (
    <div className="app">

      <div className="app__navbar">
        <img src={logo} className="app__navbar_logo"></img>
        <p className="app__navbar_title">Music Theory Cheatsheet</p>
      </div>

      <br></br>

      <div className="app__selection">
        <Box sx={{ minWidth: 360 }} >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Root Note</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rootNote}
              label="rootNoot"
              onChange={handleChange}
            >
              {notes.map(note => <MenuItem value={note}>{note}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </div>

      <br></br><br></br>

      <div>
        {
          rootNote !== '' ?
            <div className="app__output">

              <div className="app__card">
                <p className="app__card_description">Notes in {rootNote} Major scale</p>
                <div className="list">
                  {
                    keyNote(rootNote).majorNote.map(note => <p className="list_item">{note}</p>)
                  }
                </div>
                <br></br><br></br>
                <p className="app__card_description">Notes in {rootNote} Minor scale</p>
                <div className="list">
                  {
                    keyNote(rootNote).minorNote.map(note => <p className="list_item">{note}</p>)
                  }
                </div>
              </div>

              <div className="app__card">
                <p className="app__card_description">Chords in {rootNote} Major key</p>
                <div className="list">
                  {
                    keyChord(rootNote).majorScale.map(note => <p className="list_item_chord">{note}</p>)
                  }
                </div>
                <br></br><br></br>
                <p className="app__card_description">Chords in {rootNote} Minor key</p>
                <div className="list">
                  {
                    keyChord(rootNote).minorScale.map(note => <p className="list_item_chord">{note}</p>)
                  }
                </div>
              </div>

              <div className="app__card">
                <p className="app__card_description">Notes to play {rootNote} Major chord</p>
                <div className="list">
                  {
                    chordNote(rootNote).majorNote.map(note => <p className="list_item">{note}</p>)
                  }
                </div>

                <br></br><br></br>

                <p className="app__card_description">Notes to play {rootNote} Minor chord</p>
                <div className="list">
                  {
                    chordNote(rootNote).minorNote.map(note => <p className="list_item">{note}</p>)
                  }
                </div>
              </div>

            </div>
            : null
        }
      </div >
    </div >
  )
}

export default App
