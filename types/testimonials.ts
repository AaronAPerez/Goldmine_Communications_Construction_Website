export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export const testimonials = [
    {
      id: '1',
      author: 'John Smith',
      role: 'Chief Technology Officer',
      company: 'TechCorp Industries',
      content: 'The team at Goldmine delivered exceptional results. Their expertise in both communications and construction made them the perfect partner for our complex infrastructure project.',
      image: '/images/testimonials/john-smith.jpg'
    },
    {
      id: '1',
      author: 'John Smith',
      role: 'Chief Technology Officer',
      company: 'TechCorp Industries',
      content: 'The team at Goldmine delivered exceptional results. Their expertise in both communications and construction made them the perfect partner for our complex infrastructure project.',
      image: '/images/testimonials/john-smith.jpg'
    },
    {
      id: '1',
      author: 'John Smith',
      role: 'Chief Technology Officer',
      company: 'TechCorp Industries',
      content: 'The team at Goldmine delivered exceptional results. Their expertise in both communications and construction made them the perfect partner for our complex infrastructure project.',
      image: '/images/testimonials/john-smith.jpg'
    },
    // ... more testimonials
  ];