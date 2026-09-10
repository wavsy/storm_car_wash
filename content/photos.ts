export type SitePhoto = {
  src: `/photo/${string}`;
  width: number;
  height: number;
  altKey: string;
};

export const photos = {
  // Abstract stand-ins until processed client photos land in public/photo/.
  // Originals stay in assets/photo/ (git-ignored). Swap files, keep these names.
  hero: {
    src: "/photo/dvor.jpg",
    width: 1600,
    height: 1067,
    altKey: "photos.dvor",
  },
  selfService: {
    src: "/photo/samoobsluzhvane.jpg",
    width: 1600,
    height: 1067,
    altKey: "photos.selfService",
  },
  staffed: {
    src: "/photo/s-ekip.jpg",
    width: 1600,
    height: 1067,
    altKey: "photos.staffed",
  },
} as const satisfies Record<string, SitePhoto>;
