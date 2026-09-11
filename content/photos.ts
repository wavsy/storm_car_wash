export type SitePhoto = {
  src: `/storm/${string}` | `/photo/${string}`;
  width: number;
  height: number;
  altKey: string;
};

export const galleryPhotos = [
  {
    src: "/storm/courtyard.jpg",
    width: 1024,
    height: 576,
    altKey: "courtyard",
  },
  {
    src: "/storm/facade.jpg",
    width: 1024,
    height: 576,
    altKey: "facade",
  },
  {
    src: "/storm/bays.jpg",
    width: 1024,
    height: 576,
    altKey: "bays",
  },
  {
    src: "/storm/panel.jpg",
    width: 1024,
    height: 576,
    altKey: "panel",
  },
  {
    src: "/storm/vacuum.jpg",
    width: 1024,
    height: 576,
    altKey: "vacuum",
  },
  {
    src: "/storm/facade-wide.jpg",
    width: 1024,
    height: 576,
    altKey: "facadeWide",
  },
  {
    src: "/storm/courtyard-angle.jpg",
    width: 1024,
    height: 576,
    altKey: "courtyardAngle",
  },
] as const satisfies readonly SitePhoto[];

export const photos = {
  panel: galleryPhotos[3],
  bays: galleryPhotos[2],
  courtyard: galleryPhotos[0],
} as const;
