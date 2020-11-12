import { FetchApi, Note, NoteStatus } from '../interfaces'

let notes: Note[] = [
    {
        id: 1,
        title: '下班打卡',
        desc: '这是一条测试TODO',
        createTime: Date.now(),
        updateTime: Date.now(),
        status: NoteStatus.INIT,
    }
]

export const list: FetchApi<never, Note[]> = async () => {
    return {
        success: true,
        data: notes.filter(note => note.status != NoteStatus.DELETE)
    }
}
export const add: FetchApi<Note, Note> = async (req) => {
    const note = req.body
    note.id = notes.reduce((max, note) => Math.max(max, note.id), 0) + 1
    note.status = NoteStatus.INIT
    note.createTime = note.updateTime = Date.now()
    notes.push(note)
    return {
        success: true,
        data: note
    }
}
export const update: FetchApi<Partial<Note>, Note[]> = async (req) => {
    const note = req.body
    const _note = notes.find(n => n.id === note.id)
    if (!_note) {
        return {
            success: false,
            error: 'not found'
        }
    } else {
        Object.assign(_note, note, {
            updateTime: Date.now()
        })
        return {
            success: true,
            data: notes.filter(note => note.status != NoteStatus.DELETE)
        }
    }
}