import { Fetch } from './Fetch'
import { Note } from '../../serve/interfaces'
import { FetchResult } from '../../serve/interfaces'

export const list = (): Promise<FetchResult<Note[]>> => Fetch('/api/notes/list', null, null, true)
export const add = (note: Note): Promise<FetchResult<Note>> => Fetch('/api/notes/add', note, null, true)
export const update = (note: Partial<Note>): Promise<FetchResult<Note[]>> => Fetch('/api/notes/update', note, null, true)
