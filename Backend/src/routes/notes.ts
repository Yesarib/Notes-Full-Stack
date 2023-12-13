import express from 'express';
import * as notesController from '../controllers/notes'

const router = express.Router();

router.get('/', notesController.getNotes);
router.get('/:noteId', notesController.getNote);
router.post('/', notesController.createNotes);
router.patch('/:noteId', notesController.updateNote);
router.delete('/:noteId', notesController.deleteNote);

export default router;