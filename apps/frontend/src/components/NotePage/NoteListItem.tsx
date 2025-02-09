import { INote } from "@/mock/mockNote";

interface INoteListItemProps {
  data: INote;
}

export default function NoteListItem({ data }: INoteListItemProps) {
  return (
    <li className="min-h-20 rounded-lg border border-woodsmoke-300 bg-woodsmoke-200 text-woodsmoke-925">
      <h3 className="p-2">Note {data.title}</h3>
    </li>
  );
}
