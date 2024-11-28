import React, { memo } from "react";

const UpperFooter: React.FC = () => {
  return (
    <div className="bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">
          STORIES, STYLES AND SPORTSWEAR AT ACTIVEATTIRE, SINCE 2024
        </h1>
        <p className="text-sm md:text-base mb-4 leading-relaxed">
          Sport keeps us fit. Keeps you mindful. Brings us together. Through sport we have the power to change lives. Whether it is through stories of inspiring athletes. Helping you to get up and get moving. Sportswear featuring the latest technologies, to up your performance. Beat your PB. ActiveAttire offers a home to the runner, the basketball player, the soccer kid, the fitness enthusiast. The weekend hiker that loves to escape the city. The yoga teacher that spreads the moves. Our styles are seen in the music scene. On stage, at festivals. Our sports clothing keeps you focused before that whistle blows. During the race. And at the finish lines. We’re here to support creators. Improve their game. Their lives. And change the world.
        </p>
        <p className="text-sm md:text-base leading-relaxed">
          ActiveAttire is about more than sportswear and workout clothes. We partner with the best in the industry to co-create. This way we offer our fans the sports apparel and style that match their athletic needs, while keeping sustainability in mind. We’re here to support creators. Improve their game. Create change. And we think about the impact we have on our world.
        </p>
        <div className="mt-8">
          <h2 className="text-3xl font-bold">ActiveAttire</h2>
        </div>
      </div>
    </div>
  );
};

export default memo(UpperFooter);
