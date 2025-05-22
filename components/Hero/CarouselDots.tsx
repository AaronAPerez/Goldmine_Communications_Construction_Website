
type HeroSlide = {
  title: string;
  // Add other properties as needed
};

interface CarouselDotsProps {
  slides: HeroSlide[];
  currentIndex: number;
  onDotClick: (index: number) => void;
}

const CarouselDots = ({ slides, currentIndex, onDotClick }: CarouselDotsProps) => (
  <div className="flex space-x-3 justify-center">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black/50 ${
          index === currentIndex
            ? 'bg-gold-400 scale-110'
            : 'bg-white/50 hover:bg-white/70'
        }`}
        aria-label={`Go to slide ${index + 1}: ${slides[index].title}`}
      />
    ))}
  </div>
);

export default CarouselDots;