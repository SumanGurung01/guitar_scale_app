import React, { useState, useEffect } from 'react'
import "../styles/App.css"
import logo from "../assets/logo.jpg"
import { notes } from '../lib/notes.js'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { keyChord, keyNote } from '../lib/music';

function App() {

  const [rootNote, setRootNote] = useState('');

  const [noteList, setNoteList] = useState({})
  const [chordList, setChordList] = useState({})

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

      <div className="app__selection">
        <Box sx={{ minWidth: 400 }} >
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


      <div>
        {
          rootNote !== '' ?
            <div className="app__output">

              <div className="app__card">
                <p>{rootNote} Major Notes</p>
                <ul>
                  {
                    keyNote(rootNote).majorNote.map(note => <li>{note}</li>)
                  }
                </ul>
                <p>{rootNote} Minor Notes</p>
                <ul>
                  {
                    keyNote(rootNote).minorNote.map(note => <li>{note}</li>)
                  }
                </ul>
              </div>



              <div className="app__card">
                <p>{rootNote} Major Chords</p>
                <ul>
                  {
                    keyChord(rootNote).majorScale.map(note => <li>{note}</li>)
                  }
                </ul>

                <p>{rootNote} Minor Chords</p>
                <ul>
                  {
                    keyChord(rootNote).minorScale.map(note => <li>{note}</li>)
                  }
                </ul>
              </div>

            </div>






            : null
        }
      </div>

    </div>

  )
}

export default App
