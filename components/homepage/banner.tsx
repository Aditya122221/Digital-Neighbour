"use client"
import { useState } from "react"
import { Play } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function Banner() {
  const [open, setOpen] = useState(false)
  const YT_ID = "h_D3VFfhvs4"

  return (
    <div className="bg-gray-100 py-16 px-6 lg:px-32">
      <section
        className="relative py-16 px-6 lg:py-32 lg:px-12 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(/homepage/banner-bg.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* right-side gradient overlay for readability */}
        {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/90 to-black/50" /> */}
        <div className="max-w-7xl mx-auto">
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - New text content */}
            <div className="relative z-10 space-y-6">
              <h2 className="text-bone text-3xl lg:text-4xl font-bold leading-tight">
                Meet your new SEO agency
              </h2>
              <div className="space-y-3">
                <p className="text-bone text-lg lg:text-xl font-medium">
                  Recover lost traffic
                </p>
                <p className="text-bone text-lg lg:text-xl font-medium">
                  Boost organic traffic
                </p>
                <p className="text-bone text-lg lg:text-xl font-medium">
                  Get more sales
                </p>
              </div>
            </div>

            {/* Right side - Play button */}
            <div className="relative flex justify-center lg:justify-center">
              <button
                aria-label="Play video"
                onClick={() => setOpen(true)}
                className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-bone text-blackbrown hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-bone/40"
              >
                <Play className="w-10 h-10" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              {open && (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </AspectRatio>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}
