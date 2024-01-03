export default async function readFileContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }

    const fileContent = await response.text();
    return fileContent;
  } catch (error) {
    // Handle errors or rethrow as needed
    throw new Error(`Error reading file: ${error.message}`);
  }
}
