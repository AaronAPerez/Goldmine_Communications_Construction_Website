import { Award, CheckCircle2, Clock } from 'lucide-react'
import React from 'react'

const BenefitsSection = () => {
  return (
    <div>
            {/* Benefits Section */}
         
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                <p className="text-gray-600">Rigorous quality control and assurance protocols.</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
                <p className="text-gray-600">Consistent on-time project completion.</p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Industry Leaders</h3>
                <p className="text-gray-600">Award-winning construction services.</p>
              </div>
            </div>
    </div>
  )
}

export default BenefitsSection