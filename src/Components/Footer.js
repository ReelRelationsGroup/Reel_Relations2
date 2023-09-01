import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between p-2 bg-base-200 fixed bottom-0 w-full">
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
            src="https://media.licdn.com/dms/image/D5635AQEh7kL96IDyew/profile-framedphoto-shrink_800_800/0/1691084633767?e=1694120400&v=beta&t=0fiZObB4hajGeSIDx5Gbbgg1VHDgpMQLqENDQ0X_XzU"
            alt="Dorjee Wangdi"
          />
        </a>
        <a href="https://www.linkedin.com/in/ellie-tetelboym/">
          <img
            className="h-10 w-10 rounded-lg opacity-70 hover:opacity-100 hover:scale-110"
            src="https://media.licdn.com/dms/image/D4D03AQGTGJGU2EixBg/profile-displayphoto-shrink_800_800/0/1685512899795?e=1698883200&v=beta&t=_V2CdzV1KiJWGnJhsBiNXXEulubpe2qD5dO_y0BfzoM"
            alt="Ellie Tetelboym"
          />
        </a>
        <a href="https://www.linkedin.com/in/jeffchee86/">
          <img
            className="h-10 w-10 rounded-lg opacity-70 hover:opacity-100 hover:scale-110"
            src="https://media.licdn.com/dms/image/D4E03AQFHhmuzadJ-IA/profile-displayphoto-shrink_800_800/0/1685372958148?e=2147483647&v=beta&t=wSqHGonDBrdK8IEjIp93QI6YETmZLZnm777WJDojiAE"
            alt="Jeffrey Chee"
          />
        </a>
        <a href="https://www.linkedin.com/in/grant-way/">
          <img
            className="h-10 w-10 rounded-lg opacity-70 hover:opacity-100 hover:scale-110"
            src="https://media.licdn.com/dms/image/D5635AQEkGQEe7UI4Jg/profile-framedphoto-shrink_800_800/0/1690220836570?e=1694120400&v=beta&t=B_ggqffDo6JN8h7QyNO2-zFAAEzVNLb3RRF09kwapL0"
            alt="Grant Way"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
