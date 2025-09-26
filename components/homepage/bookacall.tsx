import CustomButton from '../core/button';
import Image from 'next/image';

export default function BookACall() {
  return (
    <div className="bg-gray-100 py-16 px-6 lg:px-20">
    <section className="bg-junglegreen py-6 px-6 rounded-3xl shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Hand-drawn illustrations */}
          <div className="flex-1 flex items-center justify-center gap-8 order-1 lg:order-1">
          

            {/* Contact Vector */}
            <div className="relative text-darkbeige">
              <Image
                src="/homepage/contactus-vector.svg"
                alt="Contact us illustration"
                width={200}
                height={200}
                className="w-96 h-96"
                style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(8%) saturate(1000%) hue-rotate(60deg) brightness(100%) contrast(85%)' }}
              />
            </div>

          </div>

          {/* Right side - Content */}
          <div className="flex-1 text-cream text-darkbeige order-2 lg:order-2 text-center lg:text-left">
            <h2 className="md:text-6xl text-4xl font-light mb-6 text-balance">Book a call now.</h2>

            <p className="text-xl mb-4 font-light text-pretty">Let's talk about what's holding your growth back.</p>

            <p className="text-lg mb-8 font-light text-pretty opacity-90">
              No sales pitch, just a genuine conversation with our agency's director about your business.
            </p>

            <CustomButton text="Book a call" textColor="white" borderColor="white" />
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
