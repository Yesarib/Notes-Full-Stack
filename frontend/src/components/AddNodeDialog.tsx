import { Button, Form, Modal } from 'react-bootstrap'
import { Note } from '../models/note';
import { useForm } from 'react-hook-form';
import { NoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api'

interface AddNoteDialogProps {
    noteToEdit?: Note, 
    onDismiss: () => void;
    onNoteSaved: (note:Note) => void,
}

const AddNodeDialog = ( { noteToEdit,onDismiss, onNoteSaved}: AddNoteDialogProps ) => {
    
    const { register, handleSubmit, formState: {errors, isSubmitting }} = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input:NoteInput) {
        try {
            let noteResponse: Note;
            if(noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            }else {
                const noteReponse = await NotesApi.createNote(input);
                onNoteSaved(noteReponse);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note":"Add Note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id='addNoteForm' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Title'
                            isInvalid={!!errors.title}
                            {...register("title", { required:"Required"})}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Text</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={5}
                            placeholder='Text'
                            {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='submit'
                    form='addNoteForm'
                    disabled= {isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddNodeDialog