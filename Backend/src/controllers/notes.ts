import { RequestHandler } from "express";
import NoteModel from '../models/note'
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes:RequestHandler = async (req,res,next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error)
    }
}

export const getNote:RequestHandler = async(req,res,next) => {
    const noteId = req.params.noteId;
    try {
        if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400, 'Invalid note id');

        const note = await NoteModel.findById(noteId);

        if(!note) throw createHttpError(404,'Note not found');

        res.status(200).json(note);
    } catch (error) {
        next(error)
    }
}

interface CreateNoteBody {
    title?: string,
    text?: string,
}


export const createNotes: RequestHandler<unknown,unknown,CreateNoteBody,unknown> =async (req,res,next) => {
    const {title,text} = req.body;
    try {
        if(!title) throw createHttpError(400,'Note must have a title');
        const newNote = await NoteModel.create({
            title: title,
            text:text
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

interface UpdateNoteParams {
    noteId: string,
}

export const updateNote:RequestHandler<UpdateNoteParams,unknown,UpdateNoteBody,unknown> = async (req,res,next) => {
    const noteId = req.params.noteId;
    const {title,text} = req.body;

    try {
        if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400, 'Invalid note id');
        
        if(!title) throw createHttpError(400,'Note must have a title');

        const note = await NoteModel.findById(noteId);

        if(!note) throw createHttpError(404,'Note not found');

        note.title = title;
        note.text = text;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        next(error)
    }
}

export const deleteNote:RequestHandler = async(req,res,next) => {
    const noteId = req.params.noteId;
    try {
        if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400, 'Invalid note id');
        
        const note = await NoteModel.findById(noteId);

        if(!note) throw createHttpError(404,'Note not found');

        await note.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}