import ContactPage from "@/components/Contact/ContactPage";


export const metadata = {
  title: 'Contact Us | Goldmine Communications & Construction',
  description: 'Get in touch with Goldmine Communications & Construction. Contact us for communications infrastructure, construction services, and project consultations.',
  keywords: 'contact, goldmine communications, construction services, project consultation, san jose contractors',
  openGraph: {
    title: 'Contact Goldmine Communications & Construction',
    description: 'Ready to start your project? Contact our expert team for construction and communications services.',
    type: 'website',
  },
};

export default function Contact() {
  return <ContactPage />;
}