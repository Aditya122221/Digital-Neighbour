"use client";

import { motion } from "framer-motion";
// import Image from "next/image";

// type Column = {
//   title: string;
//   services: string[];
// };

// const columns: Column[] = [
//   {
//     title: "Search Engine Optimisation",
//     services: [
//       "Search Engine Optimisation",
//       "Local SEO",
//       "WordPress SEO",
//       "E-commerce SEO",
//       "AI SEO",
//     ],
//   },
//   {
//     title: "Paid Advertising",
//     services: [
//       "Google Ads",
//       "Google Remarketing",
//       "Google Shopping",
//       "Paid Social",
//       "YouTube Ads",
//     ],
//   },
//   {
//     title: "Social Media Management",
//     services: [
//       "Facebook Marketing",
//       "X Marketing",
//       "Instagram Marketing",
//       "LinkedIn Marketing",
//       "TikTok Marketing",
//     ],
//   },
//   {
//     title: "Content Marketing",
//     services: [
//       "Content Marketing",
//       "Copywriting",
//       "Graphic Designing",
//       "Video Editing",
//       "Photo Shoot",
//       "Video Shoot",
//     ],
//   },
// ];

// const iconMapping: Record<string, string> = {
//   "Search Engine Optimisation": "/navbar/seo.png",
//   "Local SEO": "/navbar/local-seo.png",
//   "WordPress SEO": "/navbar/wordpress-seo.png",
//   "E-commerce SEO": "/navbar/ecom-seo.png",
//   "AI SEO": "/navbar/ai-seo.png",
//   "Google Ads": "/navbar/google-ads.png",
//   "Google Remarketing": "/navbar/google-remarketing.png",
//   "Google Shopping": "/navbar/google-shopping.png",
//   "Paid Social": "/navbar/paid-social.png",
//   "YouTube Ads": "/navbar/youtube-ads.png",
//   "Facebook Marketing": "/navbar/fb.png",
//   "X Marketing": "/navbar/x.png",
//   "Instagram Marketing": "/navbar/instagram.png",
//   "LinkedIn Marketing": "/navbar/linkedin.png",
//   "TikTok Marketing": "/navbar/tik-tok.png",
//   "Content Marketing": "/navbar/content-marketing.png",
//   "Copywriting": "/navbar/copywriting.png",
//   "Graphic Designing": "/navbar/graphic-designing.png",
//   "Video Editing": "/navbar/video-editing.png",
//   "Photo Shoot": "/navbar/photoshoot.png",
//   "Video Shoot": "/navbar/videoshoot.png",
// };

const seoServices = [
  "Search Engine Optimisation",
  "Local SEO",
  "Wordpress SEO",
  "E-commerce SEO",
  "Shopify SEO",
  "SEO audits",
  "AI SEO",
  "Online Reputation Management",
  "SEO Migration",
  "Small Business SEO",
  "Lead Generation",
  "Link building services",
  "International SEO",
  "Mobile SEO",
  "Voice search optimisation",
  "Video SEO",
  "YouTube SEO",
  "SEO strategy consulting",
  "GEO",
  "SGE",
  "App Store Optimisation (ASO)",
  "Guest posting services",
  "Local citation building",
  "Penalty recovery services",
  "Multilingual SEO",
];

// Divide services into 3 equal columns
const column1 = seoServices.slice(0, 9);
const column2 = seoServices.slice(9, 17);
const column3 = seoServices.slice(17);

export default function OtherServices() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-pink/20 to-white">
      <div className="container max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center text-3xl md:text-6xl font-regular text-blackbrown font-cal-sans tracking-wide mb-12"
        >
          Our Other SEO{" "}
          <span className="relative inline-block">
            <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-green5"></span>
            <span className="relative z-10 font-medium italic">
              Services & Solutions
            </span>
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <ul className="space-y-3">
              {column1.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 text-blackbrown/90"
                >
                  <span className="w-2 h-2 rounded-full bg-green4 inline-block flex-shrink-0" />
                  <span className="text-lg">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="space-y-4"
          >
            <ul className="space-y-3">
              {column2.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 text-blackbrown/90"
                >
                  <span className="w-2 h-2 rounded-full bg-green4 inline-block flex-shrink-0" />
                  <span className="text-lg">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <ul className="space-y-3">
              {column3.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 text-blackbrown/90"
                >
                  <span className="w-2 h-2 rounded-full bg-green4 inline-block flex-shrink-0" />
                  <span className="text-lg">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// {/* OLD SECTION - COMMENTED OUT */}
// export default function OtherServices() {
//   return (
//     <section className="py-20 px-6 bg-gradient-to-b from-pink/20 to-white">
//       <div className="container max-w-7xl mx-auto">
//         {/* Heading */}
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="text-center text-3xl md:text-6xl font-regular text-blackbrown font-cal-sans tracking-wide mb-12"
//         >
//           Our Other SEO <span className="relative inline-block">
//               <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-green5"></span>
//               <span className="relative z-10 font-medium italic">Services & Solutions</span>
//             </span>
//         </motion.h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//           {columns.map((col, colIdx) => (
//             <motion.div
//               key={col.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6, delay: colIdx * 0.1, ease: "easeOut" }}
//               className="space-y-5"
//             >
//               <h3 className="text-xl font-semibold text-blackbrown">{col.title}</h3>
//               <ul className="space-y-4">
//                 {col.services.map((svc) => (
//                   <li key={svc} className="flex items-center gap-3 text-blackbrown/90">
//                     {iconMapping[svc] ? (
//                       <Image
//                         src={iconMapping[svc]}
//                         alt={svc}
//                         width={20}
//                         height={20}
//                         className="w-5 h-5 object-contain"
//                       />
//                     ) : (
//                       <span className="w-2 h-2 rounded-full bg-yellow inline-block" />
//                     )}
//                     <span className="text-lg">{svc}</span>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
