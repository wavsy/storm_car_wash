import type { Pending } from "./pending";

export const business = {
  nameBg: "Автомивка СТОРМ",
  nameEn: "STORM Car Wash",
  cityBg: "Казанлък",
  cityEn: "Kazanlak",
  landmarkBg: "по пътя за Овощник, под базата на Кибо 2",
  landmarkEn: "on the road to Ovoshtnik, below the Kibo 2 depot",
  mapsUrl: "https://maps.app.goo.gl/uJ84F9tVYmijmLseA",
  facebookUrl: "https://www.facebook.com/profile.php?id=61577435788574",
  opened: "2026-03-26",
  // Lat/lng resolved from the confirmed maps URL above — not a guessed pin.
  coordinates: {
    lat: 42.6096959,
    lng: 25.4075256,
  },
  phone: null as Pending<string>,
  email: null as Pending<string>,
  postalAddress: null as Pending<string>,
  legalName: null as Pending<string>,
  eik: null as Pending<string>,
};
