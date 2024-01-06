'use server'

export default async (query: string) => {
  try {
    const response = await fetch(`${process.env.TLD}/api/getData?${query}`);
    const data = await response.json();
    
    return data.data[0];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};