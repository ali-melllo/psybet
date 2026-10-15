import { BuyPackButton } from "@/components/ui/buy-pack-button";
import { cn } from "@/lib/utils";
import type { NftPack } from "@/types/marketplace";
import Image from "next/image";

export function NftPackCard({ pack }: { pack: NftPack }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] shadow-xl transition-transform duration-200 hover:-translate-y-1"
      )}
    >
      <div className="relative flex shadow-inner p-2 ">

        <Image
          width={1000}
          height={1000}
          alt={"Psybet"}
          src={pack.image}
          className="h-64 md:w-full object-cover rounded-t-lg"
        />
        <span
          className={cn(
            "absolute right-2 top-2 px-3 rounded-lg rounded-br-none rounded-tl-none pt-1 text-xs font-bold uppercase bg-primary text-white"
          )}
        >
          {pack.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-2 pb-1">
        <h3 className="font-display text-lg font-bold">{pack.name}</h3>
        <p className="text-sm text-muted-foreground">{pack.supply.toLocaleString("en-US")} packs</p>
        
        <div className="flex items-center justify-between">

          <div className="md:size-10 hidden md:flex justify-center items-center">
            <svg
            className="scale-125 -ml-4"
              viewBox="0 0 800 600"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="solana-gradient"
                  x1="300.549"
                  y1="184.631"
                  x2="547.984"
                  y2="425.529"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#CF41E8" />
                  <stop offset="1" stopColor="#10F2B0" />
                </linearGradient>
              </defs>


              <path
                d="M504.3 237.5C503.5 238.4 502.5 239.1 501.4 239.5C500.3 240 499.1 240.2 497.9 240.2H271.4C263.4 240.2 259.3 230.2 264.9 224.2L302.1 184.7C302.9 183.8 303.9 183.1 305.1 182.6C306.2 182.1 307.4 181.9 308.6 181.9H536C544.1 181.9 548.1 192 542.4 198L504.3 237.5Z
M504.3 414.1C502.6 415.8 500.3 416.8 497.9 416.8H271.4C263.4 416.8 259.3 407 264.9 401.2L302.1 362.6C302.9 361.7 303.9 361 305.1 360.5C306.2 360 307.4 359.8 308.6 359.8H536C544.1 359.8 548.1 369.7 542.4 375.5L504.3 414.1Z
M504.3 273.6C502.6 271.9 500.3 270.9 497.9 270.9H271.4C263.4 270.9 259.3 280.7 264.9 286.5L302.1 325.1C302.9 326 303.9 326.7 305.1 327.2C306.2 327.7 307.4 327.9 308.6 327.9H536C544.1 327.9 548.1 318 542.4 312.2L504.3 273.6Z"
                fill="url(#solana-gradient)"
              />
            </svg>
          </div>


          <p className="text-sm -ml-2 font-semibold">{pack.priceSol} SOL</p>
          <BuyPackButton pack={pack} />
        </div>
      </div>
    </article>
  );
}
