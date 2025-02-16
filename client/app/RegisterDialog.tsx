import AuthDialog from "../components/AuthDialog";

interface RegisterDialogProps {
  onClose: () => void;
}

export default function RegisterDialog({ onClose }: RegisterDialogProps) {
  return <AuthDialog onClose={onClose} mode="register" />;
}
