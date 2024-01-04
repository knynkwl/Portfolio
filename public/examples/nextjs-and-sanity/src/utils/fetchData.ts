export default async (query: string, callback: (data: any) => void) => {
  try {
    const response = await fetch(`/api/getData?${query}`);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};