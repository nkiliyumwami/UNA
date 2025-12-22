import React from "react";


const Page = () => {
  const programData = {
    title: "Conflict Resolution and Peace Program",
    description: `
      The Conflict Resolution and Peace Program is dedicated to fostering 
      understanding, dialogue, and cooperation within communities affected 
      by disputes, violence, or social divisions. We believe that peace is not 
      merely the absence of conflict but the presence of justice, equity, and 
      mutual respect.

      Through grassroots initiatives, we equip communities with the tools 
      needed to resolve disputes peacefully, strengthen trust, and promote 
      inclusive participation in decision-making processes. Our approach 
      combines traditional conflict resolution practices with modern mediation 
      techniques, ensuring culturally respectful and lasting solutions.

      Key activities include:
      • Mediation and dialogue sessions between conflicting groups  
      • Peace education workshops in schools and community centers  
      • Training youth and women as peace ambassadors and mediators  
      • Advocacy for policies that strengthen social cohesion and reduce violence  

      Impact so far:
      • Resolved over 150 local disputes through mediation and dialogue  
      • Trained 500+ community peace ambassadors across rural and urban areas  
      • Reduced school-related violence through peer mediation programs  
      • Partnered with local leaders and organizations to promote reconciliation  

      The Conflict Resolution and Peace Program continues to create spaces 
      where understanding triumphs over division, and communities can thrive 
      in harmony.
    `,
    actions: [
      { label: "Join as Peace Ambassador", href: "/join" },
      {
        label: "View Case Studies",
        href: "/downloads/conflict-resolution.pdf",
      },
      { label: "Support Our Work", href: "/donate" },
      { label: "Go Back", href: "/" },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url('/programs_images/img3.jpg')` }}
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
