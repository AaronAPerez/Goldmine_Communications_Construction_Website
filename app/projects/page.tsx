'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Server, Shield, CheckCircle2, PenToolIcon, CableIcon, CableCar, PenTool } from 'lucide-react';


interface TechnicalSpec {
  category: string;
  details: {
    title: string;
    specifications: string[];
    standards?: string[];
    capabilities?: string[];
  }[];
}

export default function CommunicationsPage() {

  const technicalSpecs: TechnicalSpec[] = [
    {
      category: "Fiber Optic Solutions",
      details: [
        {
          title: "Installation Capabilities",
          specifications: [
            "Single-mode and multi-mode fiber installation",
            "Underground and aerial fiber deployment",
            "Fusion splicing and termination",
            "OTDR testing and certification",
            "Fiber optic cable pulling and placement"
          ],
          standards: [
            "TIA-568 compliance",
            "ISO/IEC 11801 standards",
            "BICSI guidelines adherence"
          ],
          capabilities: [
            "Up to 100Gb/s transmission speeds",
            "Maximum link length: 10km (single-mode)",
            "Minimum bend radius compliance",
            "End-to-end testing and certification"
          ]
        }
      ]
    },
    {
      category: "Network Infrastructure",
      details: [
        {
          title: "Data Center Solutions",
          specifications: [
            "High-density rack and cabinet installation",
            "Power distribution unit (PDU) setup",
            "Cooling system implementation",
            "Environmental monitoring systems",
            "Fire suppression system integration"
          ],
          standards: [
            "ANSI/TIA-942 compliance",
            "Uptime Institute standards",
            "NFPA 75 guidelines"
          ],
          capabilities: [
            "Tier III and IV data center design",
            "N+1 redundancy configuration",
            "99.999% uptime capability",
            "Power usage effectiveness (PUE) < 1.5"
          ]
        }
      ]
    },
    {
      category: "Structured Cabling",
      details: [
        {
          title: "Cabling Infrastructure",
          specifications: [
            "Category 6A/7 cable installation",
            "Patch panel and rack mounting",
            "Cable management systems",
            "Telecommunications room setup",
            "Horizontal and backbone cabling"
          ],
          standards: [
            "ANSI/TIA-568.2-D compliance",
            "ISO/IEC 11801 Class EA standards",
            "BICSI installation guidelines"
          ],
          capabilities: [
            "10Gb/s network support",
            "PoE++ compatibility",
            "500MHz bandwidth support",
            "25-year system warranty"
          ]
        }
      ]
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/communications-hero.jpg"
          alt="Communications Infrastructure"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Technical Communications Solutions
              </h1>
              <p className="text-xl text-white/90">
                Industry-leading specifications and standards in telecommunications infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Technical Specifications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicalSpecs.map((spec) => (
              <div
                key={spec.category}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{spec.category}</h3>
                  
                  {spec.details.map((detail) => (
                    <div key={detail.title} className="mb-6">
                      <h4 className="text-lg font-semibold text-gold-400 mb-3">
                        {detail.title}
                      </h4>
                      
                      {/* Specifications */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Specifications:
                        </p>
                        <ul className="space-y-2">
                          {detail.specifications.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-gold-400 mt-1" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Standards */}
                      {detail.standards && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Industry Standards:
                          </p>
                          <ul className="space-y-2">
                            {detail.standards.map((standard) => (
                              <li key={standard} className="flex items-start gap-2">
                                <Shield className="w-4 h-4 text-gold-400 mt-1" />
                                <span className="text-sm text-gray-700">{standard}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Capabilities */}
                      {detail.capabilities && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Technical Capabilities:
                          </p>
                          <ul className="space-y-2">
                            {detail.capabilities.map((capability) => (
                              <li key={capability} className="flex items-start gap-2">
                                <Server className="w-4 h-4 text-gold-400 mt-1" />
                                <span className="text-sm text-gray-700">{capability}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Technical Information */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Quality Assurance & Testing</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gold-400 mb-4">
                  Testing Procedures
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CableCar className="w-5 h-5 text-gold-400 mt-1" />
                    <span>OTDR testing for fiber optic installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CableIcon className="w-5 h-5 text-gold-400 mt-1" />
                    <span>Cable certification and verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PenToolIcon className="w-5 h-5 text-gold-400 mt-1" />
                    <span>Network performance testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PenTool className="w-5 h-5 text-gold-400 mt-1" />
                    <span>End-to-end system validation</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gold-400 mb-4">
                  Quality Standards
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-gold-400 mt-1" />
                    <span>ISO 9001:2015 certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-gold-400 mt-1" />
                    <span>BICSI certified technicians</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-gold-400 mt-1" />
                    <span>TIA/EIA compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-gold-400 mt-1" />
                    <span>Industry-standard warranties</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us to discuss your technical requirements and specifications.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold-400 text-white px-8 py-3 rounded-lg 
                       font-medium hover:bg-gold-500 transition-colors"
            >
              Schedule Technical Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

