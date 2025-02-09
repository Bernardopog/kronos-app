import NoteList from "@/ui/NotePage/NoteList";

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
    </main>
  );
}
