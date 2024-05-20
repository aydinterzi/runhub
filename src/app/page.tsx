import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function Home() {
  return (
    <MaxWidthWrapper>
      <Hero />
      <Features />
    </MaxWidthWrapper>
  );
}

function Hero() {
  return (
    <section className="bg-blue-500 text-white mt-10">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Join the Run Community</h1>
        <p className="mb-8">
          Connect with fellow runners, organize runs, and enjoy running
          together!
        </p>
        <a
          href="#signup"
          className="bg-white text-blue-500 px-6 py-3 rounded-full font-bold hover:bg-gray-100"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Features</h2>
        <p className="text-gray-600">
          Discover what makes our app unique and perfect for runners.
        </p>
      </div>
      <div className="flex flex-wrap">
        <FeatureCard
          title="Easy Run Creation"
          description="Create and organize runs with ease using our intuitive interface."
          icon="🛠️"
        />
        <FeatureCard
          title="Find Running Buddies"
          description="Connect with other runners in your area and run together."
          icon="🤝"
        />
        <FeatureCard
          title="Track Your Progress"
          description="Monitor your running stats and achievements over time."
          icon="📈"
        />
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="w-full md:w-1/3 px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
