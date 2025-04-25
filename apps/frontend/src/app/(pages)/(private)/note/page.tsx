import {
  NoteList,
  NoteListButton,
  NoteMain,
  NoteOptions,
  NoteOptionsButton,
} from "@/layout/PageLayout/NotePage";

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
