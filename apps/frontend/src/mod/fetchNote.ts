import { INote } from "@/mock/mockNote";

function error(err: unknown) {
  console.error("Fetch Error ==>", err);
}

export async function getNoteFetch() {
  try {
    const res = await fetch(`http://localhost:3030/note`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    error(err);
  }
}

export async function getSpecificNoteFetch(id: string) {
  try {
    const res = await fetch(`http://localhost:3030/note/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) return null;

    const selectedNote = await res.json();
    return selectedNote;
  } catch (err) {
    error(err);
  }
}

export async function createNoteFetch() {
  try {
    const res = await fetch("http://localhost:3030/note", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return null;

    const createdNote: INote = await res.json();
    return createdNote;
  } catch (err) {
    error(err);
  }
}

export async function favoriteNoteFetch(id: string) {
  try {
    const res = await fetch(`http://localhost:3030/note/favorite/${id}`, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) return null;

    const favoritedNote = await res.json();
    return favoritedNote;
  } catch (err) {
    error(err);
  }
}

export async function changeNoteIconFetch(id: string, icon: string) {
  try {
    const res = await fetch(`http://localhost:3030/note/icon/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ icon }),
    });

    if (!res.ok) return null;

    const changedNote = await res.json();
    return changedNote;
  } catch (err) {
    error(err);
  }
}

export async function renameNoteFetch(id: string, title: string) {
  try {
    const res = await fetch(`http://localhost:3030/note/rename/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) return null;

    const renamedNote = await res.json();
    return renamedNote;
  } catch (err) {
    error(err);
  }
}

export async function changeNoteContentFetch(id: string, content: string) {
  try {
    const res = await fetch(`http://localhost:3030/note/content/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) return null;

    const changedNote = await res.json();
    return changedNote;
  } catch (err) {
    error(err);
  }
}

export async function deleteNoteFetch(id: string) {
  try {
    const res = await fetch(`http://localhost:3030/note/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) return null;

    const deletedNote = await res.json();
    return deletedNote;
  } catch (err) {
    error(err);
  }
}

export async function getTagsFetch() {
  try {
    const res = await fetch(`http://localhost:3030/tag`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    error(err);
  }
}

export async function createTagFetch(tagName: string) {
  try {
    const res = await fetch("http://localhost:3030/tag", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tagName }),
    });

    if (!res.ok) return null;

    const createdTag = await res.json();
    return createdTag;
  } catch (err) {
    error(err);
  }
}

export async function deleteTagFetch(id: string) {
  try {
    const res = await fetch(`http://localhost:3030/tag/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) return null;

    const deletedTag = await res.json();
    return deletedTag;
  } catch (err) {
    error(err);
  }
}

export async function addTagToNoteFetch(noteId: string, tagId: string) {
  try {
    const res = await fetch(`http://localhost:3030/note/tag`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId, tagId }),
    });

    if (!res.ok) return null;

    const addedTag = await res.json();
    return addedTag;
  } catch (err) {
    error(err);
  }
}

export async function removeTagFromNoteFetch(noteId: string, tagId: string) {
  try {
    const res = await fetch(`http://localhost:3030/note/tag`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId, tagId }),
    });

    if (!res.ok) return null;

    const removedTag = await res.json();
    return removedTag;
  } catch (err) {
    error(err);
  }
}
