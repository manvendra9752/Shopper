import React from "react";

const DescriptionBox = () => {
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto container px-6 p-4 h-full">
      <div className="w-full flex items-center justify-start">
        <div className="border p-4 font-semibold text-lg">Description</div>
        <div className="border p-4 font-semibold text-lg">Reviews(122)</div>
      </div>
      <div className="w-full border p-4">
        <p className="p-2">
          Experience unparalleled convenience and efficiency with our latest
          state-of-the-art Smart Home Assistant. This sleek, voice-activated
          device seamlessly integrates with your existing smart home ecosystem,
          allowing you to control lighting, thermostats, security systems, and
          more with simple voice commands.
        </p>
        <p className="p-2">
          E-commerce Product Review: I recently upgraded to the Smart Home
          Assistant, and it has completely transformed my daily life. The
          installation was straightforward, and it seamlessly integrated with
          all my existing smart devices. Overall, the Smart Home Assistant has
          exceeded my expectations, offering unmatched convenience and truly
          enhancing my smart home experience.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
