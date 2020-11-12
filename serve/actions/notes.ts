import { FetchApi } from '../interfaces'

export enum NoteStatus {
    INIT, DOING, DONE, DELETE
}
export const NoteStatusMap = new Map([
    [NoteStatus.INIT, '未开始'],
    [NoteStatus.DOING, '进行中'],
    [NoteStatus.DONE, '已完成'],
])
export interface Note {
    id: number
    title: string
    desc?: string
    createTime?: number
    updateTime?: number
    status?: NoteStatus
}

let notes: Note[] = []
let index = 0

export const list: FetchApi<never, Note[]> = async () => {
    return {
        success: true,
        data: notes.filter(note => note.status != NoteStatus.DELETE)
    }
}
export const add: FetchApi<Note, Note> = async (req) => {
    const note = req.body
    note.id = ++index
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
    const _note = notes.find(note => note.id === note.id)
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
            data: notes
        }
    }
}