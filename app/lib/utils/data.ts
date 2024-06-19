export const fetchAsvsData = async () => {
  const res = await fetch('http://localhost:3000/asvs.json')
  if (!res.ok) {
    throw new Error('Failed to fetch the ASVS data')
  }

  const data = await res.json();
  return data;
}
