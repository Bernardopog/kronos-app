import NoteList from "@/ui/NotePage/NoteList";
import NoteListButton from "@/ui/NotePage/NoteListButton";
import NoteMain from "@/ui/NotePage/NoteMain";

export default function NotePage() {
  return (
    <main
      className="
        grid overflow-clip
        page p-0 note-page-layout
      "
      id="main"
    >
      <NoteList />
      <NoteListButton />
      <NoteMain />
    </main>
  );
}
