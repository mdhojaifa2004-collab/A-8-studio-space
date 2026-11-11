export type Booking = {
  id: string;
  studioId: string;
  studioName: string;
  category: string;
  date: string;
  time: string;
  hours: number;
  total: number;
  currency: string;
  createdAt: string;
};

const KEY = "studiospace-bookings";

export function getBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function addBooking(booking: Booking) {
  try {
    const list = getBookings();
    localStorage.setItem(KEY, JSON.stringify([booking, ...list]));
  } catch {}
}

export function removeBooking(id: string): Booking[] {
  const list = getBookings().filter((b) => b.id !== id);
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
  return list;
}

export function clearBookings() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}