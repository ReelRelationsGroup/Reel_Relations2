import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between p-4 bg-base-200 fixed bottom-0 w-full">
      <div className="flex items-center space-x-4">
        <img
          className="h-12 max-w-sm rounded-lg"
          src="https://media.istockphoto.com/id/1319788168/vector/cat-set-popcorn-fsoda-glass-cute-cartoon-funny-character-kittens-watching-movie-black-white.jpg?s=170667a&w=0&k=20&c=AYpYwT0i76U0R28eCCj46Xg8f6b-sZ5PuYR7qDtOUro="
          alt="logo"
        />
        <p className="text-sm text-gray-500">
          Copyright © 2023 - All rights reserved
        </p>
      </div>
      <div className="flex space-x-4">
        <a href="https://www.linkedin.com/in/dorjeewangdi/">
          <img
            className="h-10 w-10 rounded-lg opacity-70 hover:opacity-100 hover:scale-110"
            src="https://media.licdn.com/dms/image/D5603AQHBa_04FHXJhQ/profile-displayphoto-shrink_800_800/0/1685257545695?e=1693440000&v=beta&t=2Fslbq3xzwHYk_EKXGWiMUxNibN_-CLZJ2jWCADKCcs"
            alt="Dorjee Wangdi"
          />
        </a>
        <a href="https://www.linkedin.com/in/ellie-tetelboym/">
          <img
            className="h-10 w-10 rounded-lg opacity-70 hover:opacity-100 hover:scale-110"
            src="https://media.licdn.com/dms/image/D4D03AQGTGJGU2EixBg/profile-displayphoto-shrink_800_800/0/1685512899795?e=1693440000&v=beta&t=3OpB8pmoZO0nba25NklQ5kTnCKrALUOIlHWE7DQtv_M"
            alt="Ellie Tetelboym"
          />
        </a>
        <a href="https://www.linkedin.com/in/jeffchee86/">
          <img
            className="h-10 w-10 rounded-lg opacity-70 hover:opacity-100 hover:scale-110"
            src="https://media.licdn.com/dms/image/D4E03AQFHhmuzadJ-IA/profile-displayphoto-shrink_800_800/0/1685372958148?e=1693440000&v=beta&t=0DZjSndAxBBuDIMnknNM1wtD3ZSjI1p__uKl_-wPlUg"
            alt="Jeffrey Chee"
          />
        </a>
        <a href="https://www.linkedin.com/in/grant-way/">
          <img
            className="h-10 w-10 rounded-lg opacity-70 hover:opacity-100 hover:scale-110"
            src="https://media.licdn.com/dms/image/D5603AQE_VM4dCnYWOg/profile-displayphoto-shrink_800_800/0/1685539963458?e=1693440000&v=beta&t=m4cP1mztlKoA7jklxQ4xEP6IjaFhqK9cfMzKw7sUZOk"
            alt="Grant Way"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;