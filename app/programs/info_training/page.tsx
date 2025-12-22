import React from "react";

const Page = () => {
  const programData = {
    title: "Information Training and Resource Centre",
    description: `
      At UNA Rwanda, we believe that knowledge is power and that access to the right information can transform lives. The Information Training and Resource Centre (ITRC) is one of our key programs, designed to empower young people, professionals, and communities with the skills, tools, and resources they need to succeed in today’s knowledge-driven society.
What the Program Offers
📚 Capacity Building & Training: We provide high-quality training in digital literacy, information management, research skills, leadership, and communication. These trainings will be tailored to the needs of university students, young professionals, and community members.
📱 Nexus Android App: The program introduces Nexus, an innovative mobile application that makes learning resources accessible anytime and anywhere. Nexus will serve as a central hub for students, researchers, and educators to access study materials, training modules, and collaborative learning spaces.
🌍 Access to Resources: The ITRC will connect learners to digital libraries, research tools, and global information resources, bridging the gap between local communities and international knowledge.
👥 Inclusive Empowerment: By offering flexible training methods workshops, online modules, and mobile access we ensure that opportunities reach not only universities but also rural communities, youth organizations, and other groups that often face barriers to education.


Why It Matters
In an era where technology and information drive development, many students and communities in Rwanda still struggle to access reliable resources and training opportunities. The ITRC is designed to close this gap by creating a sustainable ecosystem of learning and knowledge sharing. It will:
Strengthen the capacity of young people to compete in the job market.
Support universities and educational institutions with supplementary learning tools.
Encourage innovation, research, and problem-solving among the youth.
Foster collaboration between students, educators, and development partners.
Our Vision
The Information Training and Resource Centre is more than a program it is a movement towards inclusive knowledge empowerment. By combining physical training sessions, digital platforms like the Nexus app, and partnerships with educational institutions, we aim to nurture a generation of skilled, confident, and globally connected Rwandans.

    `,
    actions: [
      //   { label: "Enroll in Training", href: "/enroll" },
      //   { label: "Access Resources", href: "/resources" },
      //   { label: "Become a Mentor", href: "/volunteer" },
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
