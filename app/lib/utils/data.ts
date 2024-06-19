export const fetchAsvsData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/asvs.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch the ASVS data");
  }

  const data = await res.json();
  return data;
};
