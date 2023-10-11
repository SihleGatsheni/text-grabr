'use client';
import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';

const Profile = () => {
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    setShowCard(true);
  }, []);
  const completedProjects = [
    {
      title: 'Online Accomodation Booking System',
      description: 'The appication has both client and business functionality.',
      imageUrl: '/accomodation.jpg', // Replace with the actual image URL
      projectUrl: 'https://github.com/SihleGatsheni/homecoming-cloud-api', // Replace with the actual project URL
    },
    {
      title: 'Mobile MarketPlace',
      description: 'Mobile market place to list your items for sale and buy items from other users.',
      imageUrl: '/barterx.jpg', // Replace with the actual image URL
      projectUrl: 'https://github.com/SphesihleJamile/BarterX_Mobile_Application', // Replace with the actual project URL
    },
    {
      title: 'Sketekete Online Food Store',
      description: 'An Online Fast Food Ordering System.',
      imageUrl: '/skete.jpeg', // Replace with the actual image URL
      projectUrl: '/about', // Replace with the actual project URL
    },
    {
      title: 'FileUploadHelper Library',
      description: 'Library to simplify image upload to different cloud providers ( AzureBlobStorage | FirebaseSorage | Server System).',
      imageUrl: '/library.png', // Replace with the actual image URL
      projectUrl: 'https://github.com/SihleGatsheni/indlovu.file-upload-helper', // Replace with the actual project URL
    },
    {
      title: 'Windows Forms POS System',
      description: 'Desktop Point of Sale System for small businesses.',
      imageUrl: '/pos.png', // Replace with the actual image URL
      projectUrl: 'https://github.com/SihleGatsheni/M2Project/', // Replace with the actual project URL
    },
    // Add more projects here
  ];


  const toolsImages =
    [
      'tools/android.jpeg',
      'tools/C#.png',
      'tools/cicd.png',
      'tools/docker.png',
      'tools/databases.png',
      'tools/dotnet.png',
      'tools/drawio.png',
      'tools/dsa.png',
      'tools/fullvs.png',
      'tools/git-github.png',
      'tools/golang.png',
      'tools/Java.png',
      'tools/nextjs.png',
      'tools/pgadmin.png',
      'tools/postman.png',
      'tools/rider.jpeg',
      'tools/ssms.png',
      'tools/vscode.png',
    ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Developer Info */}
      <div className="text-center mb-8">
        <img
          src="/profile.jpg" // Replace with the actual image URL
          alt="Developer"
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
        />
        <h1 className="text-3xl font-bold text-blue-600">Sihle Ndlovu</h1>
        <p className="text-lg text-gray-600">Backend / FullStack Developer</p>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <a href="https://www.linkedin.com/in/sihle-ndlovu-developer/" target="_blank" rel="noopener noreferrer">
            <img
              src="/linkedin-icon.png" // Replace with the actual LinkedIn icon URL
              alt="LinkedIn"
              className="w-9 h-9"
            />
          </a>
        </div>
      </div>

      {/* About Developer */}
      <div className="text-center mb-8">
        <div className={`description-card ${showCard ? 'show' : ''}`}>
          <h2 className="description-title">Professional Summary</h2>
          <p className="description-text">
            Highly skilled backend/full-stack developer with expertise in C#,
            ASP.NET MVC, Microsoft SQL Server, and Web API. Proficient in Docker containerization,
            Git, and GitHub for version control and collaboration.
            Successfully deployed applications to Microsoft Azure, ensuring scalability and performance.
            Experienced in React.js and Next.js for frontend development, delivering responsive user interfaces.
            Proactive problem-solver with a passion for staying up-to-date with the latest technologies.
            Adaptable team player committed to delivering high-quality solutions.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {completedProjects.map((project, index) => (
            <div key={index} className="bg-white overflow-hidden shadow-lg">
              <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">{project.title}</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <h2 className='text-center text-blue-600 mb-10'>Software stacks and tools I am familiar with</h2>
      <Carousel images={toolsImages} /> */}
    </div>
  );
};

export default Profile;
