export const facilities = {
  selfServiceBays: 5,
  staffedBays: 2,
  vacuums: 2,
  payment: {
    coins: [0.5, 1, 2] as const,
    card: true,
  },
};
