import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set cache headers
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=600'
  );

  // Example fetchServices function - replace with data fetching logic
  async function fetchServices() {
    // This is a placeholder. Replace with actual data fetching logic, e.g., database call or API request.
    return [
      { id: 1, name: 'Service 1', description: 'Description for Service 1' },
      { id: 2, name: 'Service 2', description: 'Description for Service 2' }
    ];
  }

  try {
    const services = await fetchServices();
    res.status(200).json(services);
  } catch {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
}