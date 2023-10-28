"use client";

import TypewriterComponent from "typewriter-effect";

const TypeWriter = () => {
  return (
    <TypewriterComponent
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .changeDelay(20)
          .typeString("A question a day keeps the homework away!")
          .pauseFor(1000)
          .deleteAll(10)
          .changeDelay(20)
          .typeString(
            "Succeed, Strive, and Streak Your Way to a Bright Future!"
          )
          .pauseFor(1000)
          .deleteAll(10)
          .changeDelay(20)
          .typeString("Learning Made Fun, One Streak at a Time")
          .pauseFor(1000)
          .deleteAll(10)
          .changeDelay(20)
          .typeString("Your Daily Dose of Knowledge")
          .pauseFor(1000)
          .deleteAll(10)
          .start();
      }}
    />
  );
};

export default TypeWriter;