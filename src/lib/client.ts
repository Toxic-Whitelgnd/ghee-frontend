import  { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const Client = createClient(
    {
        projectId:'qq9cy02w',
        dataset:'production',
        apiVersion:'2024-10-26',
        useCdn: true,
        token: 'sk3w7fVYot7Ey6YdOyG5pNz5jdXzqHTId9qxRauLS5vTixMt1BRZeZcrhWX4keawXVQbqL9JjKk2Dp5Xwet7WUVjG5GfWke4PrYkHf3fTAFh6UjkJ48QrdblTeYQgyQLUKdynozFcg4HgrkUFi6hI3J7veTxHNmGkGNELug3hwRYDNjGAe32'
    }
)

  // Image URL builder
  const builder = imageUrlBuilder(Client);

  export function urlFor(source: any) {
    return builder.image(source);
  }


