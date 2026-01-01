import { useRef } from "react";
import { Upload, X, Link as LinkIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload = ({ value, onChange, label, className = "" }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB for localStorage)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Please use an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onChange(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isBase64 = value?.startsWith("data:");

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="font-mono text-xs text-muted-foreground block">{label}</label>
      )}
      
      <div className="flex items-center gap-2">
        {/* URL Input */}
        <div className="flex-1 relative">
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Paste image URL or upload file"
            value={isBase64 ? "(Local file uploaded)" : value}
            onChange={handleUrlChange}
            disabled={isBase64}
            className="w-full bg-background border border-border pl-9 pr-3 py-2 text-foreground text-sm focus:outline-none focus:border-accent-blue transition-colors disabled:opacity-50"
          />
        </div>
        
        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        >
          <Upload size={14} />
        </button>
        
        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X size={14} />
          </button>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      {/* Preview */}
      {value && (
        <div className="mt-2">
          <img 
            src={value} 
            alt="Preview" 
            className="h-16 w-auto object-cover border border-border rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
