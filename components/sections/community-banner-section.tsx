import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";

export function CommunityBannerSection() {
  return (
    <section aria-labelledby="community-title" className="py-4 ">
      <Reveal>
        <div className="relative py-14 md:py-20">
         
          <div className="relative flex flex-col items-center shadow-2xl gap-4 text-center sm:flex-row sm:text-left">
            <Image
              width={3000}
              height={3000}
              alt={"Psybet"}
              src={"/images/branding/psy-pack.png"}
              className="w-full object-cover"
            />       
          </div>
        </div>
      </Reveal>
    </section>
  );
}
