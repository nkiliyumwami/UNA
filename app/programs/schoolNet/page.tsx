import React from "react";

const Page = () => {
  const programData = {
    title: "School-Net Program",
    description: `
      The School-Net Program connects schools, teachers, and learners through 
      innovative technology and collaborative networks. By bridging digital 
      divides, we enable schools to share resources, adopt modern teaching 
      tools, and foster partnerships that enhance learning opportunities.

      The program emphasizes equal access to digital education, ensuring that 
      even schools in rural or underserved areas are not left behind. Through 
      this initiative, we help institutions leverage online platforms, 
      digital libraries, and virtual classrooms to deliver high-quality 
      education that prepares learners for the future.

      Key activities include:
      • Providing schools with affordable internet connectivity and ICT resources  
      • Training teachers in digital literacy and e-learning methodologies  
      • Facilitating inter-school collaborations through online forums and projects  
      • Developing and sharing open educational resources across the network  

      Impact so far:
      • Connected over 120 schools to reliable internet and ICT labs  
      • Trained 1,800 teachers in digital learning and blended classrooms  
      • Supported more than 15,000 students with access to e-learning resources  
      • Established partnerships with ministries and NGOs to scale access  

      The School-Net Program continues to open doors of opportunity by 
      transforming classrooms into connected learning communities.
    `,
    actions: [
      //   { label: "Join School-Net", href: "/schoolnet/join" },
      //   { label: "Access Learning Resources", href: "/schoolnet/resources" },
      //   { label: "Partner With Us", href: "/schoolnet/partners" },
      { label: "Go Back", href: "/" },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/programs_images/img6.jpg)` }}
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
