import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const themes = [
    { title: "L'internet", image: 'images/l-internet.jpg', firebase: 'l-internet' },
    { title: "L'éducation", image: 'images/l-education.jpg', firebase: 'l-education'},
    { title: 'La nourriture', image: 'images/la-nourriture.jpg', firebase: 'la-nourriture'},
    { title: "La santé", image: 'images/la-sante.jpg', firebase: 'la-sante'},
    { title: "Le séjour linguistique", image: 'images/le-sejour-linguistique.jpg', firebase: 'le-sejour-linguistique'},
    { title: "Le look", image: 'images/le-look.jpg', firebase: 'le-look'},
    { title: "L'environnement", image: 'images/l-environnement.jpg', firebase: 'l-environnement'},
    { title: "Les loisirs", image: 'images/les-loisirs.jpg', firebase: 'les-loisirs'},  
    { title: "Les connecteurs logique", image: 'images/les-connecteurs-logique.jpg', firebase: "les-connecteurs-logique"},
    { title: "Les verbes", image: 'images/les-verbes.jpg', firebase: "les-verbes"},
    { title: "Les Adjectifs", image: 'images/les-adjectifs.jpg', firebase: 'les-adjectifs'}
  ];

  return (
    <div className="flex flex-col h-screen bg-teal-800">
      {/* Navbar */}
      <nav className="bg-teal-500 py-4">
        <h1 className="text-lg font-bold text-center text-white">French Vocabulator</h1>
      </nav>

      <div className="flex-1 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 place-items-center p-4">
        {themes.map((theme, index) => (
          <Link to={`/play/${theme.title}`} key={index}>
            <div className="bg-teal-200 shadow-md rounded p-4 w-64 h-64 hover:scale-125">
              <img src={theme.image} alt={theme.title} className="w-full h-32 object-cover rounded-md" />
              <h2 className="text-lg font-bold text-teal-800">{theme.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;