import { AboutData } from '@/types/about';
import type { StrapiResponse } from '@/types/strapi-utils';

/**
 * Generic API client class for making HTTP requests
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic GET request method
   */
  async get<T = unknown>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as T;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('API GET Error:', error.message);
        throw error;
      } else {
        console.error('Unknown API error');
        throw new Error('Unknown API error occurred');
      }
    }
  }

  /**
   * Generic POST request method
   */
  async post<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const responseData = (await response.json()) as T;
      return responseData;
    } catch (error) {
      if (error instanceof Error) {
        console.error('API POST Error:', error.message);
        throw error;
      } else {
        console.error('Unknown API error');
        throw new Error('Unknown API error occurred');
      }
    }
  }

  // Add PUT, DELETE methods as needed...
}

const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
);

export const api = {
  getAbout: () =>
    apiClient.get<StrapiResponse<AboutData>>('/api/about', { populate: '*' }),
};

export { apiClient };
