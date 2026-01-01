import { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  annotation?: string;
  onClick?: () => void;
}

const ActionButton = ({ icon, label, annotation, onClick }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 text-foreground hover:text-accent-blue transition-colors duration-300"
    >
      <span className="text-3xl">{icon}</span>
      <span className="font-sans text-base font-medium">
        {label}
        {annotation && (
          <span className="text-accent-blue ml-1">{annotation}</span>
        )}
      </span>
    </button>
  );
};

export default ActionButton;
