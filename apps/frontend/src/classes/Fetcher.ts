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
      const token = sessionStorage.getItem("accessToken");
      const res = await fetch(url, {
        method: "GET",
        
        headers: {
          Authorization: `Bearer ${token}`,
        }
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
      const token = sessionStorage.getItem("accessToken");
      let res: Response;
      if (body) {
        res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          }
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
      const token = sessionStorage.getItem("accessToken");
      let res: Response;
      if (fieldIsOptions) {
        res = await fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (!res.ok) return null;
        const dataUpdated = (await res.json()) as U;
        return dataUpdated;
      } else {
        res = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fieldOrOption),
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
      const token = sessionStorage.getItem("accessToken");
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
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
      const token = sessionStorage.getItem("accessToken");
      let res: Response;
      if (bodyOrOptions) {
        res = await fetch(url, {
          method: "DELETE",
          body: JSON.stringify(bodyOrOptions),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
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
