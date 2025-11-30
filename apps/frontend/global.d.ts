interface Window {
  cookieStore?: {
    set: (options: {
      name: string;
      value: string;
      path?: string;
    }) => Promise<void>;
    get?: (name: string) => Promise<{ name: string; value: string } | null>;
    delete?: (name: string) => Promise<void>;
  };
}

declare var cookieStore: Window['cookieStore'];
