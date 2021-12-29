import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface ConfirmationDialogType {
  header: string;
  message: string;
  action: () => void;
  isOpen: boolean;
  onClose: () => void;
}
const ConfirmationDialog: React.FC<ConfirmationDialogType> = ({
  header,
  message,
  action,
  ...props
}) => {
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={action} ml={3}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
