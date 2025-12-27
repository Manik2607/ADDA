"use client";

import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaHandsHelping,
  FaLightbulb,
  FaHeart,
  FaGraduationCap,
  FaBuilding,
  FaEnvelope,
  FaInstagram,
  FaPhone,
} from "react-icons/fa";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: <FaUsers className="text-4xl text-primary-600" />,
      title: "Public Participation",
      description:
        "Empowering every citizen of Akhnoor to actively participate in community development and decision-making processes.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-accent-600" />,
      title: "Community Service",
      description:
        "Providing essential services and facilities to bridge the gap between government administration and local residents.",
    },
    {
      icon: <FaLightbulb className="text-4xl text-primary-600" />,
      title: "Awareness & Education",
      description:
        "Promoting public awareness, computer literacy, and educational opportunities for holistic regional development.",
    },
    {
      icon: <FaHeart className="text-4xl text-accent-600" />,
      title: "Social Development",
      description:
        "Addressing societal challenges through organized initiatives in healthcare, education, and infrastructure.",
    },
  ];

  const initiatives = [
    {
      title: "District Status Advocacy",
      description:
        "Leading the movement for Akhnoor to achieve district-level administrative status, addressing the needs of our vast geographical area and growing population.",
    },
    {
      title: "Infrastructure Development",
      description:
        "Working towards improved connectivity, healthcare facilities, educational institutions, and essential services across the region.",
    },
    {
      title: "Digital Literacy Programs",
      description:
        "Bridging the digital divide through computer literacy initiatives and technology awareness campaigns.",
    },
    {
      title: "Community Engagement",
      description:
        "Organizing public forums, awareness campaigns, and grassroots movements to amplify the voice of Akhnoor's residents.",
    },
    {
      title: "Youth Empowerment",
      description:
        "Creating opportunities for youth development, skill enhancement, and leadership training to build a prosperous future.",
    },
    {
      title: "Healthcare Accessibility",
      description:
        "Advocating for better healthcare infrastructure and medical facilities to ensure wellness for all residents.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-navy-800 via-primary-700 to-navy-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              About ADDA
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-semibold text-primary-300">
              Akhnoor District Demand Association
            </p>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              A grassroots movement dedicated to empowering the Akhnoor region
              through advocacy, community development, and public service
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-navy-800 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The Akhnoor District Demand Association (ADDA) is a
                  community-driven organization committed to addressing the
                  unique challenges faced by the Akhnoor region. With a large
                  population spread across a vast geographical area, our
                  residents deserve access to essential services and
                  district-level administrative infrastructure.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We work tirelessly to bridge the gap between citizens and
                  essential services, advocating for development, education,
                  healthcare, and administrative excellence. Through public
                  participation and organized initiatives, we strive to create a
                  prosperous and self-sufficient Akhnoor.
                </p>
              </div>
              <div className="relative">
                <div className="relative bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8 shadow-xl overflow-hidden">
                  {/* Background ADDA logo with backdrop */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <img
                      src="/ADDA.png"
                      alt="ADDA Logo Background"
                      className="w-64 h-64 object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <FaMapMarkerAlt className="text-6xl text-primary-600 mb-4" />
                    <h3 className="text-2xl font-bold text-navy-800 mb-2">
                      Serving Akhnoor
                    </h3>
                    <p className="text-lg text-primary-700 font-semibold mb-4">
                      Building a better tomorrow
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-primary-600 mt-1">✓</span>
                        <span>Large and growing population base</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-600 mt-1">✓</span>
                        <span>Extensive geographical coverage</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-600 mt-1">✓</span>
                        <span>Diverse community needs and aspirations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-600 mt-1">✓</span>
                        <span>
                          Strategic importance in regional development
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Guiding principles that drive our commitment to community
              development and social progress
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary-600"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-navy-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy-800 mb-4">
              Our Key Initiatives
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Strategic programs and campaigns designed to bring meaningful
              change to the Akhnoor region and improve quality of life for all
              residents
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-primary-600"
              >
                <h3 className="text-xl font-bold text-navy-800 mb-3">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {initiative.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved / Contact Section */}
      <section id="join-the-movement" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-navy-800 mb-6">
              Join the Movement
            </h2>
            <p className="text-lg text-gray-700 mb-12">
              Be a part of Akhnoor's transformation. Your voice matters in
              shaping the future of our region. Connect with us to stay informed
              and get involved.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <a
                href="mailto:Akhnooradda2026@gmail.com"
                className="group bg-gradient-to-br from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <FaEnvelope className="text-5xl text-primary-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-navy-800 mb-2">
                  Email Us
                </h3>
                <p className="text-gray-600 break-all">
                  Akhnooradda2026@gmail.com
                </p>
              </a>

              <a
                href="https://www.instagram.com/adda.2026"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-pink-50 to-purple-100 hover:from-pink-100 hover:to-purple-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <FaInstagram className="text-5xl text-pink-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-navy-800 mb-2">
                  Follow Us
                </h3>
                <p className="text-gray-600">@adda.2026</p>
              </a>

              <a
                href="tel:+919419190100"
                className="group bg-gradient-to-br from-accent-50 to-accent-100 hover:from-accent-100 hover:to-accent-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <FaPhone className="text-5xl text-accent-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-navy-800 mb-2">
                  Call Us
                </h3>
                <p className="text-gray-600">+91 9419190100</p>
              </a>
            </div>

            <div className="mt-12 bg-gradient-to-r from-navy-800 via-primary-700 to-navy-900 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Together We Build</h3>
              <p className="text-lg text-gray-200">
                ADDA is more than an organization—it's a movement of dedicated
                citizens working towards a brighter future for Akhnoor. Join us
                in creating lasting change through community action, awareness,
                and advocacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
