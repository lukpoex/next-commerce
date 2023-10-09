import Image from "next/image";

import { Campaigns } from "@/lib/types";

export default function CampaignCard(props: Campaigns) {
  return (
    <div className="w-full cursor-pointer group border border-gray-300 hover:border-gray-400 transition-all ease-linear">
      <div className="relative aspect-square max-h-[280px] w-full h-full overflow-hidden">
        <Image
          fill
          src={props.src}
          alt={props.desc}
          className="w-full h-full object-cover group-hover:scale-105 transition-all ease-linear"
          sizes="(max-width: 480px) 30vw, 100vw"
          priority={true}
        />
      </div>
      <div className="h-24 text-gray-600 py-3 px-4">
        <p>{props.brand}</p>
        <b className="group-hover:text-gray-800">{props.desc}</b>
      </div>
    </div>
  );
}
