const EventCardLoading = () => {
  return (
    <div className="w-[250px] cursor-default relative group overflow-hidden duration-300 shadow-navbar bg-[#F6F7F8] h-[330px]">
      <div className="h-[200px] w-full bg-gray-500 animate-pulse relative after:absolute after:w-full after:h-2 after:bg-primary after:top-0"></div>
      <div className="w-full flex justify-between items-center mt-4 px-4">
        <div className="w-7/12 h-3 bg-gray-500 animate-pulse"></div>
      </div>
      <div className="w-full flex justify-between items-center mt-4 px-4">
        <div className="w-11/12 h-3 bg-gray-500 animate-pulse"></div>
      </div>
      <div className="w-full flex justify-between items-center mt-2 px-4">
        <div className="w-8/12 h-3 bg-primary animate-pulse"></div>
      </div>
      <div className="w-full flex justify-between items-center mt-2 px-4">
        <div className="w-6/12 h-3 bg-gray-500 animate-pulse"></div>
      </div>
    </div>
  );
};

export default EventCardLoading;
