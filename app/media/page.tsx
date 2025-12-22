"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import Loading from "@/components/ui/Loading";

interface ImageData {
  id: string;
  public_id: string;
  format: string;
  url: string;
}

interface SubFolder {
  key: string;
  title: string;
  description: string;
}

interface Category {
  key: string;
  title: string;
  description: string;
  subFolders?: SubFolder[];
}

const categories: Category[] = [
  {
    key: "UNARW/musanze",
    title: "Musanze Events",
    description:
      "UNA Rwanda supported women and children at the Musanze Correctional Facility through visits that focused on mental health, education, and skills development, while also organizing a joyful Christmas celebration filled with music, gifts, and essential supplies. These efforts reflect UNA Rwanda’s ongoing commitment to improving lives, fostering hope, and championing the rights of women and children in correctional settings.",
  },
  {
    key: "UNARW/una_launch",
    title: "UNA Launch",
    description:
      "UNA Rwanda officially launched its activities through a two-day workshop at the WFP Headquarters in Kicukiro, focusing on peace, human rights, sustainable development, and support for UN programs. The workshop emphasized project development, advocacy for global goals, and alignment with Rwanda’s national development strategies.",
  },
  {
    key: "UNARW/women_empowerment",
    title: "Women Empowerment",
    description:
      "UNA Rwanda organized a Women Empowerment Program focused on enhancing business skills. Women participated in training on entrepreneurial strategies and were supported in developing sustainable business models. The initiative aimed to foster economic independence, promote long-term growth, and equip women with the tools needed for success in the business world. This program plays a vital role in empowering women to thrive and create lasting impact in their communities.",
  },
  {
    key: "UNARW/women_development",
    title: "Women Development Agenda 2015",
    description: `Women’s Development, Nation’s Development, 
During the 23rd session of Rwanda’s Parliament, 180 women leaders, including UNA Rwanda representatives, gathered to discuss youth empowerment, the responsible use of social media, and community responsibility in protecting vulnerable groups. UNA Rwanda proudly contributed by advocating for women’s leadership and social justice., Iterambere ry’Isi`,
  },
  {
    key: "UNARW/ngoma",
    title: "Ngoma Women Correction Facility",
    description: "",
    subFolders: [
      {
        key: "UNARW/ngoma/ngoma_1",
        title: "International Day of the African Child",
        description:
          "UNA Rwanda celebrated the International Day of the African Child at Ngoma Women’s Correctional Facility, focusing on children’s rights, education, and empowerment. With an emphasis on Early Childhood Development, the event engaged mothers and children through interactive activities, highlighting resilience and hope while reaffirming a commitment to a brighter, more inclusive future for every child.",
      },
      {
        key: "UNARW/ngoma/ngoma_2",
        title: "Ngoma Womens correction Facility",
        description:
          "In February, UNA Rwanda visited the Ngoma Women's Correctional Facility to engage with women and their children. Discussions focused on empowerment, health, and future opportunities, including practical advice on dental care and maintaining oral hygiene. The visit aimed to equip the women with knowledge and tools for personal growth and well-being. UNA Rwanda remains committed to supporting the rights and well-being of women and their children, working towards positive reintegration into society.",
      },
    ],
  },
  {
    key: "UNARW/international_day_violence_against_women",
    title: "16 Days of Activism",
    description: `

UNA Rwanda joined the global campaign against gender-based violence, highlighting the urgent need to protect women and girls, raise awareness, and promote lasting change. Committed beyond these 16 days, UNA Rwanda continues to advocate for a safe and just future where women and girls live free from fear and violence.`,
  },
  {
    key: "UNARW/nyamagabe_correction_facility",
    title: "Nyamagabe Correction Facility",
    description: `In August, UNA Rwanda visited the Nyamagabe Correction Facility to support women and children living there. The visit aimed to understand their needs and provide resources for successful reintegration into society. Key discussions included the importance of mental health, education, and skills training for both mothers and their children. UNA Rwanda remains committed to advocating for the rights of women and children in correctional facilities, working towards a brighter future for all.`,
  },
  {
    key: "UNARW/mageragere_correction_facility",
    title: "Mageragere Correction Facility",
    description:
      "In August, UNA Rwanda visited the Mageragere Correction Facility to engage with women and children residing there. The visit aimed to assess their needs and provide essential resources to support their well-being both inside the facility and for their successful reintegration into society. Discussions highlighted the importance of mental health, education, and skills training for both mothers and their children, focusing on enhancing their quality of life while incarcerated. UNA Rwanda is committed to advocating for the rights of women and children in correctional facilities, working towards a brighter future for all.",
  },
];

export default function Media() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);
  const [activeSubFolder, setActiveSubFolder] = useState<SubFolder | null>(
    categories[0].subFolders ? categories[0].subFolders[0] : null
  );

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      try {
        const mainResponse = await fetch(
          `/api/media?folder=${activeCategory.key}`
        );
        const mainData: ImageData[] = await mainResponse.json();

        if (activeSubFolder) {
          const subResponse = await fetch(
            `/api/media?folder=${activeSubFolder.key}`
          );
          const subData: ImageData[] = await subResponse.json();
          setImages([...mainData, ...subData]);
        } else {
          setImages(mainData);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [activeCategory, activeSubFolder]);

  const openPopup = (image: ImageData) => setSelectedImage(image);
  const closePopup = () => setSelectedImage(null);

  return (
    <div>
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/unHome.png)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>

      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mx-auto -mt-[5px] mb-8 max-w-[720px]">
          <h2 className="font-bold tracking-wide mb-4 text-3xl">Gallery</h2>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeCategory.key === cat.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => {
                setActiveCategory(cat);
                setActiveSubFolder(cat.subFolders ? cat.subFolders[0] : null);
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Category Description */}
        <div className="text-center mb-10 max-w-3xl">
          <h3 className="text-2xl font-semibold mb-2">
            {/* {activeCategory.title} */}
          </h3>
          <p className="text-gray-600">{activeCategory.description}</p>

          {/* Subfolder buttons */}
          {activeCategory.subFolders && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {activeCategory.subFolders.map((sub) => (
                <button
                  key={sub.key}
                  className={`px-3 py-2 rounded-lg font-medium transition ${
                    activeSubFolder?.key === sub.key
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveSubFolder(sub)}
                >
                  {sub.title}
                </button>
              ))}
            </div>
          )}

          {/* Subfolder description */}
          {activeSubFolder && (
            <div className="text-center mb-6 max-w-2xl">
              <h4 className="text-xl font-semibold"></h4>
              <p className="text-gray-600">{activeSubFolder.description}</p>
            </div>
          )}
        </div>

        {/* Gallery */}
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap -m-2">
            {images.map(({ url, id }, index) => (
              <motion.div
                key={id}
                className="p-2 w-full sm:w-1/2 lg:w-1/3"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() =>
                    openPopup({ url, id, public_id: "", format: "" })
                  }
                >
                  <Image
                    alt={`Image ${index + 1}`}
                    width={720}
                    height={300}
                    className="w-full h-[300px] object-cover rounded-lg"
                    src={url}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Popup */}
      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="max-w-3xl w-full p-4 bg-white rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closePopup}
            >
              ✖
            </button>
            <Image
              alt={`Popup Image`}
              width={960}
              height={600}
              className="object-cover rounded-lg"
              src={selectedImage.url}
            />
          </div>
        </div>
      )}
    </div>
  );
}
