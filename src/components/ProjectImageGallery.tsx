import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ProjectImage {
  id: number;
  title: string;
  description: string;
  url: string;
}

interface ProjectImageGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

const ProjectImageGallery = ({ images, projectTitle }: ProjectImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentImage = images[selectedIndex];

  return (
    <section className="py-16 border-b border-border">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Gallery</h2>

        {/* Main Image Display */}
        <div className="mb-8">
          <div
            className="relative w-full bg-secondary rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setIsFullscreen(true)}
          >
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-mono text-sm">Click to expand</span>
              </div>
            </div>
          </div>

          {/* Image Info */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {currentImage.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentImage.description}
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? 'border-foreground'
                  : 'border-border hover:border-foreground/50'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} className="text-white" />
          </button>

          <div className="max-w-4xl w-full">
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentImage.title}
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                {currentImage.description}
              </p>
            </div>

            {/* Fullscreen Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="text-white/60 font-mono text-sm">
                {selectedIndex + 1} / {images.length}
              </span>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectImageGallery;
