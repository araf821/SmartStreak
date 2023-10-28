import TypewriterComponent from "typewriter-effect";

const TypeWriter = () => {
  return (
    <TypewriterComponent
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("lasdkfnalsdf")
          .pauseFor(1000)
          .deleteAll()
          .typeString("asdfasdfasdf")
          .pauseFor(1000)
          .deleteAll()
          .typeString("aksdnkajsdf")
          .pauseFor(1000)
          .deleteAll()
          .typeString("asdjfnaksdjf")
          .pauseFor(1000)
          .start();
      }}
    />
  );
};

export default TypeWriter;
