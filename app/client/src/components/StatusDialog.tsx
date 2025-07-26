import React from 'react';
import { Dialog, Flex, Text, Button } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faCheckCircle, faExclamationTriangle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface StatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  header: string;
  text: string;
}

const StatusDialog: React.FC<StatusDialogProps> = ({ isOpen, onClose, type, header, text }) => {
  let icon: IconDefinition;
  let iconColorClass: string;
  let accentColor: 'red' | 'green' | 'blue' | 'yellow' | 'gray' | 'gold' | 'bronze' | 'crimson' | 'amber' | 'lime' | 'mint' | 'teal' | 'cyan' | 'sky' | 'indigo' | 'violet' | 'purple' | 'plum' | 'pink' | 'ruby';

  if (type === 'success') {
    icon = faCheckCircle;
    iconColorClass = 'text-green-500';
    accentColor = 'green';
  } else if (type === 'error') {
    icon = faTimesCircle;
    iconColorClass = 'text-red-500';
    accentColor = 'red';
  } else {
    icon = faExclamationTriangle;
    iconColorClass = 'text-gray-500';
    accentColor = 'gray';
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex direction="column" align="center" gap="4">
          <FontAwesomeIcon icon={icon} size="4x" className={iconColorClass} />
          <Dialog.Title size="5" weight="bold" align="center" color={accentColor}>
            {header}
          </Dialog.Title>
          <Dialog.Description size="3" align="center">
            {text}
          </Dialog.Description>
          <Flex justify="end" mt="4" className="w-full">
            <Dialog.Close>
              <Button size="2" variant="soft" color={accentColor} onClick={onClose}>
                Tutup
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
        <Dialog.Close className="absolute top-4 right-4">
          <Button variant="ghost" color="gray" size="2">
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default StatusDialog;
