import NoteList from "@/ui/NotePage/NoteList";
import NoteListButton from "@/ui/NotePage/NoteListButton";
import NoteMain from "@/ui/NotePage/NoteMain";
import NoteOptions from "@/ui/NotePage/NoteOptions";
import NoteOptionsButton from "@/ui/NotePage/NoteOptionsButton";

export default function NotePage() {
  return (
    <main
      className="
        grid relative overflow-clip
        page p-0 note-page-layout
      "
      id="main"
    >
      <NoteList />
      <NoteListButton />
      <NoteMain />
      <NoteOptions />
      <NoteOptionsButton />
    </main>
  );
}
