// import { GetStaticProps } from 'next';
// // Import fetchServices from its module
// import { fetchServices } from '../../lib/fetchServices';

// export const getStaticProps: GetStaticProps = async () => {
//   // Fetch data at build time
//   const services = await fetchServices();
  
//   return {
//     props: {
//       services,
//     },
//     // Revalidate every hour (ISR)
//     revalidate: 3600,
//   };
// };