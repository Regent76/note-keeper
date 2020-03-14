import response from '../../../services/response';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Note from '../../../models/Note';
import utils from '../../utils';

async function getNotes(req, res) {
  let notes;

  try {
    notes = await Note.paginate(
      Note.find({ owner: req.user.userId }),
      utils.paginateParam(req)
    );
  } catch (err) {
    response.code500(res, err);
  }

  return response.code200(res, utils.paginateResult(notes));
}

async function getNote(req, res) {
  try {
    const note = await Note.findById(req.params.note_id);
    response.code200(res, { note });
  } catch (err) {
    response.code500(res, err);
  }
}

async function createNote(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return response.code422(res, {
      message: 'Error on create item occurred.'
    });
  }
  const message = req.body.message;

  const note = new Note({
    message,
    created_by: req.user.userId,
    owner: req.user.userId
  });

  try {
    await note.save();
  } catch (err) {
    console.log(err);
    return response.code500(res, err);
  }

  response.code201(res, { note });
}

async function updateNote(req, res) {
  let note;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response.code422(res, {
        message: 'Error on update item occurred.'
      });
    }

    const noteId = req.params.note_id;
    const message = req.body.message;

    note = await Note.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(noteId),
        created_by: req.user.userId,
        owner: req.user.userId
      },
      { message: message },
      {
        new: true,
        useFindAndModify: false
      }
    ).exec();
    if (note === null) {
      return response.code404(res, 'Note not found');
    }

    response.code200(res, note);
  } catch (err) {
    response.code500(res, err);
  }
}

async function deleteNote(req, res) {
  let note;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response.code422(res, {
        message: 'Error on update item occurred.'
      });
    }

    const noteId = req.params.note_id;
    note = await Note.findOneAndDelete({
      _id: mongoose.Types.ObjectId(noteId),
      created_by: req.user.userId,
      owner: req.user.userId
    }).exec();

    if (note === null) {
      return response.code404(res, 'Note not found');
    }

    response.code204(res);
  } catch (err) {
    response.code500(res, err);
  }
}

export { createNote, getNotes, getNote, updateNote, deleteNote };
