import { images } from "../constant";

const WhatIsUp = () => {
  return (
    <div className="flex-1 py-12 z-20 relative">
      <img
        className="absolute object-cover -z-10 left-0 top-0"
        src={images.newsBg}
        alt=""
        width="100%"
        height="100%"
        loading="lazy"
      />
      <h3 className="text-5xl font-[300] text-dark uppercase">
        come closer <span className="block font-bold">what is up</span>
      </h3>
      <p className="text-base pr-6 text-justify leading-5 mt-4 capitalize">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, omnis
        porro! Itaque amet recusandae, ratione quasi magni eaque laudantium,
        odio ipsam autem rem ex eum facilis modi quibusdam qui minima officiis.
        Ex eos beatae ullam animi dolorum quis accusamus porro molestiae
        laboriosam rerum esse nostrum mollitia expedita doloribus dignissimos
        debitis reiciendis commodi repellendus sapiente, natus labore dolor
        asperiores qui. Autem.
      </p>
    </div>
  );
};

export default WhatIsUp;
