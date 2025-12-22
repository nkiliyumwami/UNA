import React from "react";

const Page = () => {
  const programData = {
    title: "Women Empowerment Program",
    description: `
      The Women Empowerment Program champions gender equality by supporting 
      women and girls through education, skills development, leadership 
      training, and advocacy. We believe that empowering women strengthens 
      families, communities, and entire nations.

      The program addresses barriers that limit women's opportunities, such as 
      unequal access to education, limited economic participation, and social 
      inequalities. By providing resources, mentorship, and safe spaces, we 
      encourage women to build confidence, pursue careers, and become change-makers.

      Key activities include:
      • Providing scholarships and access to quality education for girls  
      • Offering vocational training, entrepreneurship support, and mentorship  
      • Hosting workshops on leadership, financial literacy, and digital skills  
      • Advocating for women’s rights and protection against gender-based violence  
      • Creating networks for women leaders, professionals, and community activists  

      Impact so far:
      • 2,500 women trained in leadership and business skills  
      • 600+ girls supported with scholarships and educational resources  
      • Established 35 women-led cooperatives and enterprises  
      • Partnered with NGOs and governments to advance gender equality policies  

      Through this initiative, women gain the tools, opportunities, and 
      confidence to unlock their potential and uplift their communities.
    `,
    actions: [
      //   { label: "Join the Program", href: "/women-empowerment/join" },
      //   { label: "Support Our Work", href: "/women-empowerment/donate" },
      //   { label: "Become a Mentor", href: "/women-empowerment/mentor" },
      { label: "Go Back", href: "/" },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/programs_images/img2.jpg)` }}
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
