import React from "react";
import Link from "next/link";

const ProgramsPage = () => {
  const programs = [
    { title: "Conflict Resolution and Peace", href: "/programs/conflict_resolution" },
    { title: "Human Rights", href: "/programs/human_right" },
  ];

  return (
    <div className="py-16 px-8 md:px-24">
      <h1 className="text-4xl font-bold mb-8">Our Programs</h1>
      <div className="grid gap-6">
        {programs.map((program, index) => (
          <Link key={index} href={program.href} className="p-6 border rounded-lg hover:bg-gray-50">
            <h2 className="text-xl font-semibold">{program.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProgramsPage;
