import React from "react";

const Page = () => {
  const programData = {
    title: "Climate Change Action Program",
    description: `
      The Climate Change Action Program is our flagship initiative dedicated 
      to addressing one of the most urgent challenges of our time. We work to 
      raise awareness, mobilize communities, and support innovative solutions 
      that reduce greenhouse gas emissions, protect biodiversity, and build 
      resilience against the impacts of climate change.
      
      Through school campaigns, farmer training, and youth leadership workshops, 
      we empower the next generation with knowledge and skills to tackle climate 
      issues locally and globally. Our projects include tree-planting drives, 
      sustainable agriculture practices, and advocacy for renewable energy.
      
      So far, the program has:
      • Planted over 50,000 trees across vulnerable landscapes  
      • Trained 1,200 farmers in climate-smart agriculture  
      • Launched community clean-up and recycling campaigns  
      • Partnered with international organizations to promote sustainable policy
      
      Together, we can drive meaningful change and create a greener, more 
      sustainable future for all.
    `,
    actions: [
      //   { label: "Join the Movement", href: "/join" },
      //   { label: "View Impact Report", href: "/downloads/climate-change.pdf" },
      //   { label: "Volunteer", href: "/volunteer" },
      { label: "Go Back", href: "/" },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/programs_images/img1.webp)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white text-center">
            {programData.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          About This Program
        </h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {programData.description}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          {programData.actions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="px-5 py-2.5 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
