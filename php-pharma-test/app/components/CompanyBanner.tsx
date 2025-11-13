export default function CompanyBanner() {
  return (
    <div className="bg-[#E8B84D] py-16 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Left quote */}
          <span className="absolute -left-8 top-0 text-6xl text-[#D4A440] opacity-50">
            "
          </span>

          <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
            <span className="font-semibold">
              We are a leading manufacturer of high-value testing equipment for
              the pharmaceutical, food and cosmetics industry worldwide.
            </span>
            <br />
            <br />
            <span className="font-semibold">
              With over 40 years of experience, we provide innovative solutions
              that meet the highest quality standards and regulatory
              requirements.
            </span>
            <br />
            <br />
            <span className="font-semibold">
              Our precision instruments are trusted by laboratories and
              manufacturers across the globe, ensuring product quality and
              safety.
            </span>
            <br />
            <br />
            <span className="font-semibold">Made in Germany.</span>
          </p>

          {/* Right quote */}
          <span className="absolute -right-8 bottom-0 text-6xl text-[#D4A440] opacity-50">
            "
          </span>
        </div>
      </div>

      {/* Arrow pointing down */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#E8B84D]"></div>
      </div>
    </div>
  );
}
