import { useState } from 'react';
import { useDisclosure, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';

function NoAlgorithmAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle the condition that triggers the alert
  const handleCondition = () => {
    if (1==2) {
      onOpen();
    } else {
      // Do something else
    }
  }

  return (
    <>
      <Button onClick={handleCondition}>Check condition</Button>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Alert</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to perform this action?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" ml={3}>Confirm</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}