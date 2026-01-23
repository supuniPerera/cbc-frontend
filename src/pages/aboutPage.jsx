export default function AboutPage() {
  return (
    <div className="w-full text-white space-y-16">

      {/* Hero Section */}
      <section className="text-center space-y-6">
        <span className="
          inline-block px-4 py-1 text-sm tracking-widest
          rounded-full
          bg-primary
          text-[var(--color-accent)]
          border border-[var(--color-accent)]/40
        ">
          ABOUT US
        </span>

        <h1 className="
          text-4xl md:text-6xl font-extrabold
          text-transparent bg-clip-text
          bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-accent)]
        ">
          Crystal Beauty Clear
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-white">
          We believe beauty should be simple, natural, and empowering.
          Our mission is to bring you premium beauty products that enhance your
          natural glow.
        </p>
      </section>

      {/* Story Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text */}
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-[var(--color-accent)]">
            Our Story
          </h2>

          <p className="text-white leading-relaxed">
            Crystal Beauty Clear was founded with a passion for creating
            high-quality beauty solutions that are safe, effective, and
            thoughtfully designed. We focus on blending nature with innovation
            to deliver results you can trust.
          </p>

          <p className="text-white leading-relaxed">
            Every product we create is carefully tested and crafted to meet the
            highest standards, ensuring confidence and satisfaction for our
            customers.
          </p>
        </div>

        {/* Image / Visual */}
        <div className="bg-[url('/logo.png')] bg-cover bg-center 
          h-72 md:h-96
          rounded-2xl
          bg-accent
          backdrop-blur-md
          border border-white/20
          flex items-center justify-center
        ">
								
          
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-10">
        <h2 className="text-3xl font-bold text-center">
          Our Core Values
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {[
            {
              title: "Natural Ingredients",
              desc: "We use carefully selected ingredients that are safe and gentle."
            },
            {
              title: "Cruelty Free",
              desc: "Our products are never tested on animals."
            },
            {
              title: "Premium Quality",
              desc: "Each product meets strict quality standards."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="
                p-6 rounded-2xl
                bg-white/10 backdrop-blur-md
                border border-white/20
                hover:scale-105 transition
              "
            >
              <h3 className="text-[25px] font-bold text-primary/100">
                {item.title}
              </h3>
              <p className="mt-2 text-white text-[20px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">
          Experience Beauty, The Crystal Way
        </h2>

        <p className="text-gray-200">
          Join thousands of happy customers and discover beauty that truly
          shines.
        </p>

        
      </section>

    </div>
  );
}
