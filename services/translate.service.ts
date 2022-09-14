import axios from 'axios';

class TranslateService {
  private TRANSLATE_API_KEY: string;
  private TRANSLATE_API_URL: string;
  constructor(apiKey: string, apiUrl: string) {
    this.TRANSLATE_API_KEY = apiKey;
    this.TRANSLATE_API_URL = apiUrl;
  }

  async translateText(text: string) {
    const { data } = await axios.get<{
      code: number;
      lang: string;
      text: string[];
    }>(this.TRANSLATE_API_URL, {
      params: {
        key: this.TRANSLATE_API_KEY,
        text: text,
        lang: 'he-en',
      },
    });

    return data.text[0];
  }
}

export const getTranslateService = () => {
  const { TRANSLATE_API_KEY, TRANSLATE_API_URL } = process.env;
  if (!TRANSLATE_API_KEY || !TRANSLATE_API_URL) {
    throw new Error('Missing env vars');
  }
  return new TranslateService(TRANSLATE_API_KEY, TRANSLATE_API_URL);
};
