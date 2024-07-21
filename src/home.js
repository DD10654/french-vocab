import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const themes = [
    { title: "L'internet", image: 'images/l-internet.jpg' },
    { title: "L'éducation", image: 'images/l-education.jpg' },
    { title: 'La nourriture', image: 'images/la-nourriture.jpg' },
    { title: "La santé", image: 'images/la-sante.jpg' },
    { title: "Le séjour linguistique", image: 'images/le-sejour-linguistique.jpg' },
    { title: "Le look", image: 'images/le-look.jpg' },
    { title: "L'environnement", image: 'images/l-environnement.jpg' },
    { title: "Les loisirs", image: 'images/les-loisirs.jpg' },
    { title: "Les aliments", image: 'images/les-aliments.jpg' },
    { title: "Les connecteurs logique", image: 'images/les-connecteurs-logique.jpg' },
    { title: "Les verbes", image: 'images/les-verbes.jpg' },
    { title: "Les Adjectifs", image: 'images/les-adjectifs.jpg' }
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-[#2c3e50] py-4">
        <h1 className="text-lg font-bold text-center text-[#3498db] font-sans">French Vocabulary App</h1>
      </nav>

      <div className="flex-1 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 place-items-center p-4">
        {themes.map((theme, index) => (
          <Link 
            to="/setup"
            state={{ theme: theme.title }} 
            key={index}
          >
            <div className="bg-[#ecf0f1] shadow-md rounded p-4 w-64 h-64 hover:scale-125 border-2 border-[#3498db]">
              <img src={theme.image} alt={theme.title} className="w-full h-32 object-cover rounded" />
              <h2 className="text-lg text-[#2c3e50] font-poppins font-normal mt-8 flex justify-center">{theme.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
