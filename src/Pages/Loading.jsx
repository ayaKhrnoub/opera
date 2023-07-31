const Loading = () => {
  return (
    <div className="w-full relative bg-white z-[999] h-screen flex justify-center items-center">
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-primary border-8 h-32 w-32"></div>
      </div>
    </div>
  );
};

export default Loading;
