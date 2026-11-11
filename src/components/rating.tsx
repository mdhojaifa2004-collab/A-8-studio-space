// স্টুডিওর নাম থেকে স্থির রেটিং (৩.৮ - ৪.৯) তৈরি করে
export function getRating(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 1000;
  }
  return Math.round((3.8 + (hash % 12) / 10) * 10) / 10;
}