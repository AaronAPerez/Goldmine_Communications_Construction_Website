import { NextRequest, NextResponse } from 'next/server';
import { createRateLimitHandler } from '@/lib/rate-limit';

// Create a rate limiter: 5 submissions per hour per IP
const rateLimitHandler = createRateLimitHandler({
  maxRequests: 5,
  windowSizeInSeconds: 3600, // 1 hour
  limitExceededMessage: 'Too many contact form submissions. Please try again later.'
});

export async function POST(request: NextRequest) {
  // Check rate limit
  const rateLimitResult = await rateLimitHandler(request);
  if (rateLimitResult) return rateLimitResult;
  
  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Need to:
    // 1. Send an email notification
    // 2. Store the contact request in a database
    // 3. Integrate with a CRM system
    // 4. Set up automated responses

    // For now, simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    );
  }
}
// import type { NextApiRequest, NextApiResponse } from 'next';

// type ContactData = {
//   name: string;
//   email: string;
//   phone?: string;
//   subject?: string;
//   message: string;
//   service?: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const data = req.body as ContactData;

//     // Validate required fields
//     if (!data.name || !data.email || !data.message) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Need to:
//     // 1. Send an email notification
//     // 2. Store the contact request in a database
//     // 3. Integrate with a CRM system
//     // 4. Set up automated responses

//     // For now, simulate delay
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     // Return success response
//     return res.status(200).json({ 
//       message: 'Contact form submitted successfully' 
//     });
//   } catch (error) {
//     console.error('Contact form error:', error);
//     return res.status(500).json({ 
//       message: 'Error submitting contact form' 
//     });
//   }
// }