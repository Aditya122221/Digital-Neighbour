// import Hero from "@/components/homepage/hero"
// import Banner from "@/components/homepage/banner"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Services from "@/components/homepage/services"
import KeepYourStack from "@/components/homepage/keepyourstack"
import CaseStudy from "@/components/homepage/casestudy"
import Blogs from "@/components/homepage/blogs"
import Testimonials from "@/components/homepage/testimonials"
import BookACall from "@/components/homepage/bookacall"
import Footer from "@/components/core/footer"
import Navbar from "@/components/core/navbar"
// import Process from "@/components/homepage/process"
import Apart from "@/components/homepage/apart"
import Process2 from "@/components/homepage/process2"
// import RevealCursor from "@/components/homepage/revealcursor"
import Form from "@/components/seo/form"
import Hero4 from "@/components/homepage/hero4"

export default function HomePage() {
  return (
    <main>
      <div className="relative">
        <Navbar />
        <Hero4 />
      </div>
      {/* <Banner /> */}
      <Form />
      <BrandsMarquee />
      {/* <RevealCursor /> */}
      <Services />
      <Process2 />
      <KeepYourStack />
      <CaseStudy />
      <Apart />
      <Blogs />
      <Testimonials />
      <BookACall />
      <Footer />
    </main>
  )
}
