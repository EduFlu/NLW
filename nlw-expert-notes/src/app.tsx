import { useState } from 'react'
import logo from './assets/log-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string,
  Date: Date,
  content: string
}

export function App() {
  const [search, setSearch] = useState('') 
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorege = localStorage.getItem('notes')

    if (notesOnStorege) {
      return JSON.parse(notesOnStorege) // Get the notes from the local storage
    }

    return []
  })

  function oneNoteCreated (content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      Date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray)) // Save the notes in the local storage
  }

  function oneNoteDeleted (id: string) {
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes = search !== '' 
  ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : notes 

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt='nlw-expert' />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard oneNoteCreated={oneNoteCreated} />

        {filteredNotes.map(note => {
          return <NoteCard key={note.id} note={{ id: note.id, date: note.Date, content: note.content }} oneNoteDeleted={oneNoteDeleted}/>
        })}
      </div>
    </div>
  )
}


