import { useState } from "react";
import { X } from "lucide-react";

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSWORD = "admin123"; // Simple client-side password

const AdminPasswordModal = ({ isOpen, onClose, onSuccess }: AdminPasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError(false);
      setPassword("");
      onSuccess();
    } else {
      setError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-card border border-border p-6 w-72 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-2">
              Admin Access
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              className={`w-full bg-background border ${
                error ? "border-destructive" : "border-border"
              } px-3 py-2 text-sm font-mono focus:outline-none focus:border-accent-blue transition-colors`}
              autoFocus
            />
            {error && (
              <p className="text-destructive text-xs mt-1 font-mono">
                Incorrect password
              </p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-foreground text-background py-2 text-sm font-mono uppercase tracking-wider hover:bg-accent-blue transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPasswordModal;
