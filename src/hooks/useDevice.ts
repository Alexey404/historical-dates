import { useState, useEffect } from "react";

type DeviceType = "mobile" | "tablet" | "laptop" | "desktop";

export const useDevice = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>(
    getDevice(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDevice(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
};

const getDevice = (width: number): DeviceType => {
  if (width < 600) return "mobile";
  if (width >= 600 && width < 900) return "tablet";
  if (width >= 900 && width < 1200) return "laptop";
  return "desktop";
};
