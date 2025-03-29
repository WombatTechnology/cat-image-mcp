export const fetchCatImage = async (): Promise<string> => {
  const API_KEY = process.env.CAT_API_KEY;
  if (!API_KEY) throw new Error("CAT_API_KEY environment variable is not set");
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1&api_key=${API_KEY}`);
  const data = await response.json();
  const imageResponse = await fetch(data[0].url);
  const arrayBuffer = await imageResponse.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  return base64
}