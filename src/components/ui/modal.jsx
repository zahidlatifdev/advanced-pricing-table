import * as Dialog from '@radix-ui/react-dialog';

const Modal = ({ isOpen, onClose, onSave, content }) => (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 m-auto p-6 bg-white rounded shadow-lg max-w-lg">
            <TextEditor content={content} onSave={onSave} />
            <Dialog.Close asChild>
                <button className="absolute top-2 right-2 p-1">X</button>
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Root>
);

export default Modal;