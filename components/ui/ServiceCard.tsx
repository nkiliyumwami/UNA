import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ServiceCard = ({ service }: any) => {
  return (
    <div className="relative group rounded-lg shadow-lg bg-white overflow-hidden h-72 cursor-pointer">
      {/* Background Image */}
      <div className="relative w-full h-full">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end transition-all duration-500 group-hover:bg-opacity-70">
        <div className="p-4 w-full text-center text-white">
          {/* Title always visible */}
          <h3 className="text-lg font-semibold">{service.title}</h3>

          {/* Hidden until hover */}
          <p className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            {service.description}
          </p>

          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Link
              href={`/programs/${service.slug}`}
              className="text-blue-300 hover:underline font-medium"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
