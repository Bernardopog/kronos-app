interface IOptions {
  endpoint?: string;
  id?: string;
  query?: { key: string; value: string };
}

export class Fetcher {
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3030";
  private optionKeys = ["id", "endpoint", "query"];

  constructor(endpoint?: string) {
    if (endpoint) this.baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;
  }

  private error(err: unknown) {
    console.error(err);
  }

  public async get<T>(options?: IOptions) {
    const url = `${this.baseUrl}${options?.endpoint ? `/${options.endpoint}` : ""}${options?.id ? `/${options.id}` : ""}${options?.query ? `?${options.query.key}=${options.query.value}` : ""}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = (await res.json()) as T;
      return data;
    } catch (err) {
      this.error(err);
    }
  }

  public async post<T, U>(body?: T, options?: IOptions) {
    const url = `${this.baseUrl}${options?.endpoint ? `/${options.endpoint}` : ""}${options?.id ? `/${options.id}` : ""}${options?.query ? `?${options.query.key}=${options.query.value}` : ""}`;
    try {
      let res;
      if (body) {
        res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        });
      } else {
        res = await fetch(url, {
          method: "POST",
          credentials: "include",
        });
      }
      if (!res.ok) return null;
      const dataCreated = (await res.json()) as U;
      return dataCreated;
    } catch (err) {
      this.error(err);
    }
  }

  public async patch<T, U>(fieldOrOption: T | IOptions, options?: IOptions) {
    const fieldIsOptions =
      typeof fieldOrOption === "object" && fieldOrOption !== null
        ? Object.keys(fieldOrOption).some((key) =>
            this.optionKeys.includes(key)
          )
        : false;

    if (fieldIsOptions) {
      options = fieldOrOption as IOptions;
    }
    const url = `${this.baseUrl}${options?.endpoint ? `/${options.endpoint}` : ""}${options?.id ? `/${options.id}` : ""}${options?.query ? `?${options.query.key}=${options.query.value}` : ""}`;

    try {
      let res;
      if (fieldIsOptions) {
        res = await fetch(url, {
          method: "PATCH",
          credentials: "include",
        });
        if (!res.ok) return null;
        const dataUpdated = (await res.json()) as U;
        return dataUpdated;
      } else {
        res = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fieldOrOption),
          credentials: "include",
        });
        if (!res.ok) return null;
        const dataUpdated = (await res.json()) as U;
        return dataUpdated;
      }
    } catch (err) {
      this.error(err);
    }
  }

  public async put<T, U>(body: T, options?: IOptions) {
    const url = `${this.baseUrl}${options?.endpoint ? `/${options.endpoint}` : ""}${options?.id ? `/${options.id}` : ""}${options?.query ? `?${options.query.key}=${options.query.value}` : ""}`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });
      if (!res.ok) return null;
      const dataUpdated = (await res.json()) as U;
      return dataUpdated;
    } catch (err) {
      this.error(err);
    }
  }

  public async delete<T, U>(bodyOrOptions?: T | IOptions, options?: IOptions) {
    if (
      bodyOrOptions instanceof Object &&
      Object.keys(bodyOrOptions).some((key) => this.optionKeys.includes(key))
    ) {
      options = bodyOrOptions;
    }

    const url = `${this.baseUrl}${options?.endpoint ? `/${options.endpoint}` : ""}${options?.id ? `/${options.id}` : ""}${options?.query ? `?${options.query.key}=${options.query.value}` : ""}`;

    try {
      let res;
      if (bodyOrOptions) {
        res = await fetch(url, {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify(bodyOrOptions),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        res = await fetch(url, {
          method: "DELETE",
          credentials: "include",
        });
      }

      if (!res.ok) return null;
      const dataDeleted = (await res.json()) as U;
      return dataDeleted;
    } catch (err) {
      this.error(err);
    }
  }
}
