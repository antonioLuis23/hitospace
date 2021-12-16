import React from "react";
import NavBar from "./NavBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  onSearch?: (e: any) => void;
}
const Layout: React.FC<LayoutProps> = ({ children, variant, onSearch }) => {
  return (
    <React.Fragment>
      <NavBar onSearch={onSearch} />

      <Wrapper variant={variant}>{children}</Wrapper>
    </React.Fragment>
  );
};

export default Layout;
