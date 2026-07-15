let hotelData = [];
let festivalData = [];

export async function loadData() {
  hotelData = await fetch("/data/부산_숙박.json")
    .then(res => res.json());

  festivalData = await fetch("/data/부산_축제공연행사.json")
    .then(res => res.json());
}

export function getHotelData() {
  return hotelData;
}

export function getFestivalData() {
  return festivalData;
}