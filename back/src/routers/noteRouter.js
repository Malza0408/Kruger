import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { NoteService } from '../services/NoteService';

const noteRouter = Router();

// 새로운 쪽지 추가
noteRouter.post('/note/create', login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }
        const user_id = req.currentUserId;
        const { to, title, content } = req.body;

        const newNote = await NoteService.addNote({
            user_id,
            to,
            title,
            content
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
});

// 사용자의 모든 쪽지(보낸 쪽지 + 받은 쪽지) 목록을 가져옴
noteRouter.get('/notelist', login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const notes = await NoteService.getNotes({ user_id });

        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
});

// 사용자의 받은 쪽지 목록을 가져옴
noteRouter.get('/takenNotelist', login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const takenNotes = await NoteService.getTakenNotes({ user_id });

        res.status(200).json(takenNotes);
    } catch (error) {
        next(error);
    }
});

// 사용자의 보낸 쪽지 목록을 가져옴
noteRouter.get('/sentNotelist', login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const sentNotes = await NoteService.getSentNotes({ user_id });

        res.status(200).json(sentNotes);
    } catch (error) {
        next(error);
    }
});

// 해당 받은 쪽지의 정보를 가져옴
noteRouter.get('/takenNotes/:id', login_required, async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const user_id = req.currentUserId;
        const currentTakenNoteInfo = await NoteService.getTakenNoteInfo({
            noteId,
            user_id
        });

        res.status(200).json(currentTakenNoteInfo);
    } catch (error) {
        next(error);
    }
});

// 해당 보낸 쪽지의 정보를 가져옴
noteRouter.get('/sentNotes/:id', login_required, async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const user_id = req.currentUserId;
        const currentSentNoteInfo = await NoteService.getSentNoteInfo({
            noteId,
            user_id
        });

        res.status(200).json(currentSentNoteInfo);
    } catch (error) {
        next(error);
    }
});

// 받은 쪽지에 읽음 표시를 해줌
noteRouter.patch('/takenNotes/:id', login_required, async (req, res, next) => {
    try {
        const noteId = req.params.id;
        await NoteService.checkNote({ noteId });
        res.status(200).json('읽음처리되었습니다.');
    } catch (error) {
        next(error);
    }
});

// 해당 받은 쪽지 삭제
noteRouter.delete('/takenNotes/:id', login_required, async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const user_id = req.currentUserId;
        await NoteService.deleteTakenNote({ noteId, user_id });

        res.status(200).json('삭제되었습니다.');
    } catch (error) {
        next(error);
    }
});

// 해당 보낸 쪽지 삭제
noteRouter.delete('/sentNotes/:id', login_required, async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const user_id = req.currentUserId;
        await NoteService.deleteSentNote({ noteId, user_id });

        res.status(200).json('삭제되었습니다.');
    } catch (error) {
        next(error);
    }
});

export { noteRouter };
