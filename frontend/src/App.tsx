import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from "./components/Note"
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css'
import * as NotesApi from './network/notes_api'
import AddNodeDialog from './components/AddNodeDialog';
import { FaPlus } from 'react-icons/fa'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const loadNotes = async() => {
    try {
      const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    } catch (error) {
      console.log(error);      
    }
  }

  async function deleteNote(note:NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(exitingNote => exitingNote._id !== note._id))
    } catch (error) {
      console.log(error);      
    }
  }

  useEffect(() => {
    loadNotes();
  }, [])
  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)}
        className={`mb-4 mt-4 ${styles.flexCenter}`}
      >
        <FaPlus />
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map(note => (
          <Col key={note._id} >
            <Note 
              note={note} className={styles.note} 
              onDeleteNoteClicked={deleteNote}
            />
          </Col>
        ))}
      </Row>
      {
        showAddNoteDialog && 
        <AddNodeDialog onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={() => {}}
        />
      }
    </Container>
  );
}

export default App;
