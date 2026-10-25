import autumnLivingRoomTv from "../assets/svg/living-room-autumn-tv.svg";
import winterBedroom from "../assets/svg/bedroom-winter.svg";
import summerKitchen from "../assets/svg/kitchen-summer.svg";
import bathroomAutumn from "../assets/svg/bathroom-autumn.svg";
import springOffice from "../assets/svg/office-rainy-spring.svg";
import winterHallway from "../assets/svg/hallway-winter.svg";
import springGarden from "../assets/svg/garden-spring.svg";

export type Room = {
  id: string;
  name: string;
  slug: string;
  scene?: string;
  sceneAlt?: string;
  playlistId?: string;
  videoId?: string;
};

export const rooms: Room[] = [
  {
    id: "living-room",
    name: "Living Room",
    slug: "living-room",
    scene: autumnLivingRoomTv,
    sceneAlt:
      "A cozy autumn living room with golden leaves outside, a sage sofa, and steaming tea.",
    videoId: "5HzLumhIx6s",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    slug: "bedroom",
    scene: winterBedroom,
    sceneAlt:
      "A cozy winter bedroom with falling snow, layered blankets, a glowing bedside lamp, and a sleeping cat.",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    slug: "kitchen",
    scene: summerKitchen,
    sceneAlt:
    "A cozy summer kitchen with open windows, pink curtains, flowers, fresh bread, and steaming breakfast tea.",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    slug: "bathroom",
    scene: bathroomAutumn,
    sceneAlt:
      "A cozy autumn bathroom with golden trees and falling leaves outside, a clawfoot bath, glowing candles, and soft towels.",
  },
  {
    id: "hallway",
    name: "Hallway",
    slug: "hallway",
    scene: winterHallway,
    sceneAlt:
      "A cozy winter hallway with snow outside a sage front door, warm wall lights, hanging scarves, winter boots, and a sleeping dog.",
  },
  {
    id: "office",
    name: "Office",
    slug: "office",    
    scene: springOffice,
    sceneAlt:
      "A cozy spring office with rain on the window, blossoming trees outside, a warm desk lamp, plants, and steaming tea.",
  },
  {
    id: "outdoor",
    name: "Garden",
    slug: "outdoor",
    scene: springGarden,
    sceneAlt:
      "A blooming spring garden with flower pots, butterflies, drifting clouds, birds, a birdhouse, and a sage watering can beside a cozy bench.",
  },
];