import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { NoteService } from '../services/NoteService';

const noteRouter = Router();

noteRouter.post('/note/create', login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }
        // login_required에서 currentUserId에 로그인 유저의 id를 넣어둠
        const user_id = req.currentUserId;
        const { to, title, content } = req.body;
        console.log(to, title, content);

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

noteRouter.get('/takenNotelist', login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const takenNotes = await NoteService.getTakenNotes({ user_id });

        res.status(200).json(takenNotes);
    } catch (error) {
        next(error);
    }
});

noteRouter.get('/sentNotelist', login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const sentNotes = await NoteService.getSentNotes({ user_id });

        res.status(200).json(sentNotes);
    } catch (error) {
        next(error);
    }
});

noteRouter.get('/notes/:id', login_required, async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const currentNoteInfo = await NoteService.getNoteInfo({ noteId });

        res.status(200).json(currentNoteInfo);
    } catch (error) {
        next(error);
    }
});

noteRouter.put('/notes/:id', login_required, async (req, res, next) => {
    try {
        const noteId = req.params.id;
        console.log(noteId);
        await NoteService.checkNote({ noteId });
        res.status(200).json('읽음처리되었습니다.');
    } catch (error) {
        next(error);
    }
});

noteRouter.delete('/notes/:id', login_required, async (req, res, next) => {
    try {
        const noteId = req.params.id;
        await NoteService.deleteNote({ noteId });

        res.status(200).json('삭제되었습니다.');
    } catch (error) {
        next(error);
    }
});

export { noteRouter };
