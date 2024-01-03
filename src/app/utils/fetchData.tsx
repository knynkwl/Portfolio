const fetchData = async (query: string, dataType: 'json' | 'text' = 'json') => {
  try {
    const response = await fetch(`/${query}`);

    if (dataType === 'json') {
      const data = await response.json();
      return data;
    } else if (dataType === 'text') {
      const data = await response.text();
      return data;
    } else {
      console.error('Invalid dataType. Supported values are "json" or "text".');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;
