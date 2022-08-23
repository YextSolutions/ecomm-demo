import * as React from "react";

interface ScreenOverlayProps {
  children?: React.ReactNode;
}

const ScreenOverlay = ({ children }: ScreenOverlayProps): JSX.Element => {
  return (
    <div className="absolute top-16 bottom-0 w-screen bg-white">{children}</div>
  );
};

export default ScreenOverlay;
