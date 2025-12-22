import React from "react";

const Page = () => {
  const programData = {
    title: "UN Association Elders League",
    description: `
      The UN Association Elders League is a platform that recognizes the 
      invaluable role of elders in shaping peaceful, just, and sustainable 
      societies. With decades of lived experience, our elders serve as 
      mentors, advisors, and advocates, lending their wisdom to support 
      United Nations initiatives and community-based programs.

      This program is grounded in the belief that intergenerational dialogue 
      is key to building a future rooted in harmony and respect. By engaging 
      elders as partners in development, we ensure that knowledge, culture, 
      and traditions are preserved and passed on while addressing pressing 
      global challenges.

      Key activities include:
      • Hosting intergenerational forums that bring youth and elders together  
      • Engaging elders in peacebuilding and community mediation initiatives  
      • Leveraging traditional knowledge for sustainable development practices  
      • Advocating for elder rights and social inclusion at policy levels  

      Impact so far:
      • Reached 5,000 youth and community members through dialogue forums  
      • Involved 200 elders in mentoring and conflict resolution activities  
      • Strengthened cultural preservation programs in 15 rural communities  
      • Partnered with UN agencies to promote inclusive development goals  

      The UN Association Elders League ensures that the voices of our elders 
      are not only heard but actively shape the path toward a just and 
      sustainable future.
    `,
    actions: [
      //   { label: "Join as an Elder Mentor", href: "/elders/join" },
      //   { label: "Read Our Stories", href: "/elders/stories" },
      //   { label: "Support Intergenerational Programs", href: "/donate" },
      { label: "Go Back", href: "/" },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/programs_images/img5.jpeg)` }}
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
