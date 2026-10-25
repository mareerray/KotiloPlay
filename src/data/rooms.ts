export type Room = {
  id: string;
  name: string;
  slug: string;
};

export const rooms: Room[] = [
  { id: "living-room", name: "Living Room", slug: "living-room" },
  { id: "bedroom", name: "Bedroom", slug: "bedroom" },
  { id: "kitchen", name: "Kitchen", slug: "kitchen" },
  { id: "bathroom", name: "Bathroom", slug: "bathroom" },
  { id: "hallway", name: "Hallway", slug: "hallway" },
  { id: "office", name: "Office", slug: "office" },
  { id: "outdoor", name: "Garden", slug: "outdoor" },
];