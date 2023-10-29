import React from "react";

const StudentName = () => {
  return (
    <div className="w-48 text-white flex border border-gray-500">
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 ml-2 bg-blue-100 rounded-full"></div>
        <p className="text-sm">student Name</p>
        <p className=" ml-4">12 🔥</p>
      </div>
    </div>
  );
};

export default StudentName;
