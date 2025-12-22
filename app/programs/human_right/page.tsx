import React from "react";


const Page = () => {
  const programData = {
    title: "Human and People's Rights Program",
    description: `
      The Human and People’s Rights Program is at the heart of our mission 
      to promote dignity, justice, and equality for all. We work to ensure 
      that individuals and communities are aware of their rights, equipped 
      to claim them, and protected against violations.

      Our program focuses on raising awareness, providing legal aid, and 
      advocating for policies that safeguard fundamental freedoms such as 
      freedom of expression, equality before the law, gender rights, and 
      protection from discrimination or abuse.

      Key activities include:
      • Community workshops and awareness campaigns on fundamental rights  
      • Legal clinics offering free support to vulnerable groups  
      • Advocacy for inclusive laws and policies at local and national levels  
      • Capacity-building sessions for youth and grassroots leaders on human rights defense  

      Impact so far:
      • Reached over 20,000 people through rights awareness campaigns  
      • Provided legal support to more than 800 individuals facing rights violations  
      • Trained 400 youth leaders as human rights defenders  
      • Contributed to policy dialogues on gender equality and child protection  

      By empowering individuals and communities to stand up for their rights, 
      the Human and People’s Rights Program strengthens the foundations of 
      freedom, justice, and lasting peace.
    `,
    actions: [
      //   { label: "Request Legal Support", href: "/legal-aid" },
      //   { label: "Read Our Publications", href: "/downloads/human-rights.pdf" },
      //   { label: "Become a Rights Advocate", href: "/volunteer" },
      { label: "Go Back", href: "/" },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url('/programs_images/img4.jpg')` }}
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
