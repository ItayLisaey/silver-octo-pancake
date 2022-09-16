import axios from 'axios';
import { sleep } from '../utils/sleep.util';

class AIModelService {
  private AIMODEL_API_KEY: string;
  private AIMODEL_API_URL: string;
  private AIMODEL_API_VERSION: string;
  constructor(apiKey: string, apiUrl: string, apiVersion: string) {
    this.AIMODEL_API_KEY = apiKey;
    this.AIMODEL_API_URL = apiUrl;
    this.AIMODEL_API_VERSION = apiVersion;
  }

  async getInitalPrompt(text: string) {
    try {
      const { data } = await axios.post<{
        urls: {
          get: string;
        };
        output: string[] | null;
      }>(
        this.AIMODEL_API_URL,
        {
          version: this.AIMODEL_API_VERSION,
          input: {
            prompt: text,
          },
        },
        {
          headers: {
            Authorization: `Token ${this.AIMODEL_API_KEY}`,
          },
        }
      );

      return data.urls.get;
    } catch (e: any) {
      const status = e?.response?.status;
      if (status) {
        throw new Error(status);
      }
      console.error(e.response);
      throw new Error(e.response.code);
    }
  }

  async getPromptByUrl(url: string) {
    try {
      const { data } = await axios.get<{
        output: string[] | null;
      }>(url, {
        headers: {
          Authorization: `Token ${this.AIMODEL_API_KEY}`,
        },
      });
      return data.output;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }

  async getPrompt(text: string) {
    const url = await this.getInitalPrompt(text);
    await sleep(2000);
    let output = null;
    let count = 0;
    while (!output) {
      if (count > 5) {
        break;
      }
      const promptResponse = await this.getPromptByUrl(url);
      if (promptResponse) {
        output = promptResponse[0];
      }
      count++;
      await sleep(1500);
    }
    return output;
  }
}

export const getAIModelService = () => {
  const { AIMODEL_API_KEY, AIMODEL_API_VERSION, AIMODEL_API_URL } = process.env;

  if (!AIMODEL_API_KEY || !AIMODEL_API_VERSION || !AIMODEL_API_URL) {
    throw new Error('Missing env vars');
  }

  return new AIModelService(
    AIMODEL_API_KEY,
    AIMODEL_API_URL,
    AIMODEL_API_VERSION
  );
};
