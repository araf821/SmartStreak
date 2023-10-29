const page = ({ params }: { params: { classId: string } }) => {
  return <div>{params.classId}</div>;
};

export default page;
