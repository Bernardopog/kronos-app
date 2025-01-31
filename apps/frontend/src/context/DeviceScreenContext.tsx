"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop" | "";

interface IDeviceScreenContext {
  device: DeviceType;
}

const DeviceScreenContext = createContext({} as IDeviceScreenContext);

const DeviceScreenProvider = ({ children }: { children: ReactNode }) => {
  const [device, setDevice] = useState<DeviceType>("");

  useEffect(() => {
    const watchScreenSize = () => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 768) {
          setDevice("mobile");
        } else if (width >= 768 && width < 1024) {
          setDevice("tablet");
        } else {
          setDevice("desktop");
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    };
    watchScreenSize();
  }, []);

  return (
    <DeviceScreenContext.Provider
      value={{
        device,
      }}
    >
      {children}
    </DeviceScreenContext.Provider>
  );
};

export { DeviceScreenContext, DeviceScreenProvider };
