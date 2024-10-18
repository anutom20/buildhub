// // pages/index.js
"use client";

export default function Home() {
  const staticImageUrls = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026302d",
    "https://i.pravatar.cc/150?u=a04258114e29026702d",
    "https://i.pravatar.cc/150?u=a04258114e29026708c",
  ];
  return (
    <main className="min-h-screen">
      <nav className="px-4 py-4 md:px-10 flex justify-between items-center text-charcoal-500">
        <div className="w-1/3 space-x-10 flex items-center">
          <a href="#" className="hover:text-primary text-lg">
            Features
          </a>
          <a href="#" className="hover:text-primary text-lg">
            Security
          </a>
          <a href="#" className="hover:text-primary text-lg">
            Pricing
          </a>
        </div>
        <div className="flex items-center">
          <h1 className="font-black text-5xl text-primary">Makerhub</h1>
        </div>
        <div className="w-1/3 items-center flex justify-end space-x-10">
          <a href="/auth/login" className="hover:text-primary text-lg">
            Sign In
          </a>
          <a
            href="#"
            className="bg-transparent hover:bg-primary text-primary  hover:text-white py-3 px-9 border border-primary hover:border-transparent rounded"
          >
            Get Started
          </a>
        </div>
      </nav>
      <section className="h-[50vh] mx-8 mt-28 space-y-10 flex items-center justify-content flex-col text-charcoal-500">
        <h1 className="font-extrabold text-7xl font-bold max-w-4xl text-center">
          Generate product roadmaps with AI..
        </h1>
        <span className="text-2xl text-charcoal">
          Transform your ideas into a thriving venture with Makerhub
        </span>
        <button className="hover:bg-primary text-primary font-bold py-4 px-10 border border-primary rounded hover:text-white">
          Start for free
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            {staticImageUrls.map((item) => {
              return (
                <img
                  src={item}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-lg hover:shadow-xl -ml-2"
                />
              );
            })}
          </div>
          <div>
            <h1 className="font-bold text-lg">Trusted by</h1>
            <span className="text-lg text-charcoal">many founders</span>
          </div>
        </div>
      </section>
    </main>
  );
}
