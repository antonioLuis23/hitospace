import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular" | "large";
interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "large",
}) => {
  let maxWidth = "0px";
  if (variant === "small") maxWidth = "400px";
  if (variant === "regular") maxWidth = "800px";
  if (variant === "large") maxWidth = "90%";

  return (
    <Box mt={8} mx="auto" maxW={maxWidth} w="100%">
      {children}
    </Box>
  );
};
