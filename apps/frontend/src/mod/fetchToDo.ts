import { IToDoTask } from "@/mock/mockToDoList";

interface IUpdateToDoTask extends Partial<IToDoTask> {
  categoryId: string | null;
}

function error(err: unknown) {
  console.error("Fetch Error ==>", err);
}

export async function createToDoTaskFetch(body: Partial<IToDoTask>) {
  try {
    const res = await fetch("http://localhost:3030/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!res.ok) return null;

    const createdTask: IToDoTask = await res.json();
    return createdTask;
  } catch (err) {
    error(err);
  }
}

export async function getToDoTasksFetch() {
  try {
    const res = await fetch("http://localhost:3030/todo", {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    error(err);
  }
}

export async function updateToDoTaskFetch(id: string, body: IUpdateToDoTask) {
  try {
    const res = await fetch(`http://localhost:3030/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    if (!res.ok) return null;

    const updatedTask = await res.json();
    return updatedTask;
  } catch (err) {
    error(err);
  }
}

export async function toggleToDoTaskFetch(id: string) {
  try {
    const res = await fetch(`http://localhost:3030/todo/${id}`, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) return null;

    const toggledTask = await res.json();
    return toggledTask;
  } catch (err) {
    error(err);
  }
}

export async function deleteToDoTaskFetch(id: string) {
  try {
    const res = await fetch(`http://localhost:3030/todo/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) return null;

    const deletedTask = await res.json();
    return deletedTask;
  } catch (err) {
    error(err);
  }
}

export async function deleteManyToDoTasksFetch(
  target: "all" | "completed" | "uncompleted"
) {
  try {
    const res = await fetch(`http://localhost:3030/todo?target=${target}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) return null;

    const deletedManyTasks = await res.json();
    return deletedManyTasks;
  } catch (err) {
    error(err);
  }
}

export async function getCategoriesFetch() {
  try {
    const res = await fetch("http://localhost:3030/category", {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    error(err);
  }
}

export async function createCategoryFetch(title: string) {
  try {
    const res = await fetch("http://localhost:3030/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
      credentials: "include",
    });

    if (!res.ok) return null;

    const createdCategory = await res.json();
    return createdCategory;
  } catch (err) {
    error(err);
  }
}

export async function renameCategoryFetch(id: string, newTitle: string) {
  try {
    const res = await fetch(`http://localhost:3030/category/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
      credentials: "include",
    });

    if (!res.ok) return null;

    const renamedCategory = await res.json();
    return renamedCategory;
  } catch (err) {
    error(err);
  }
}

export async function deleteCategoryFetch(id: string) {
  try {
    const res = await fetch(`http://localhost:3030/category/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) return null;

    const deletedCategory = await res.json();
    return deletedCategory;
  } catch (err) {
    error(err);
  }
}
