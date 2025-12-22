import React from "react";
import { ServiceCard } from "../ui/ServiceCard";
import img1 from "../../public/programs_images/img1.webp";
import img2 from "../../public/programs_images/img2.jpg";
import img3 from "../../public/programs_images/img3.webp";
import img4 from "../../public/programs_images/img4.webp";
import img5 from "../../public/programs_images/img5.jpeg";
import img6 from "../../public/programs_images/img6.jpg";
import img7 from "../../public/programs_images/img7.jpeg";

const services = [
  {
    title: "Information Training and Resource Centre",
    description:
      "Provides access to information, training, and resources to empower individuals and communities.",
    image: img1,
    slug: "info_training",
  },
  {
    title: "Human and People's Rights",
    description:
      "Promotes and protects the fundamental rights and freedoms of individuals and communities.",
    image: img2,
    slug: "human_right",
  },
  {
    title: "Conflict Resolution and Peace",
    description:
      "Facilitates peaceful resolution of conflicts and promotes harmony within communities.",
    image: img3,
    slug: "conflict_resolution",
  },
  {
    title: "Climate Change Programs",
    description:
      "Addresses the challenges of climate change through awareness, mitigation, and adaptation initiatives.",
    image: img4,
    slug: "climate_changes",
  },
  {
    title: "Women Empowerment",
    description:
      "Supports and empowers women through education, skills development, and advocacy for gender equality.",
    image: img5,
    slug: "women_empowerment",
  },
  {
    title: "School-Net",
    description:
      "Connects schools and educational institutions to enhance learning opportunities and collaboration.",
    image: img6,
    slug: "schoolNet",
  },
  {
    title: "UN Association Elders League",
    description:
      "Engages and mobilizes elders to contribute their wisdom and experience to UN initiatives and programs.",
    image: img7,
    slug: "una_elders_league",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Programs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
