export interface Service {
  name: string;
  slug: string;
}

export const services: Service[] = [
  { name: "Netflix", slug: "netflix" },
  { name: "Adobe", slug: "adobe" },
  { name: "Spotify", slug: "spotify" },
  { name: "Hulu", slug: "hulu" },
  { name: "Amazon Prime", slug: "amazon-prime" },
  { name: "Xbox Game Pass", slug: "xbox-game-pass" },
  { name: "Dropbox", slug: "dropbox" },
  { name: "Planet Fitness", slug: "planet-fitness" },
];
