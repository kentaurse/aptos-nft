interface HeroImageSectionProps {}

export const HeroImageSection: React.FC<HeroImageSectionProps> = () => {
  return (
    <section>
      <div className="relative h-[48rem] max-h-[75vh]">
        <img src="/hero.webp" alt="" className="absolute w-full h-full object-cover" />
      </div>
    </section>
  );
};
