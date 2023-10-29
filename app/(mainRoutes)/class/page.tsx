import QuestionModule from "@/components/QuestionModule";
import StudentName from "@/components/StudentName";
import Image from "next/image";
import { FC } from "react";
interface ClassPageProps {}

const ClassPage: FC<ClassPageProps> = () => {
  return (
    <div className="w-full text-md text-white flex p-8 m-8">
      {/* <div>Image container</div> */}
      <div className="flex-3 flex-col gap-8">
        <div>{/* Image */}</div>
        <div>
          {/* <Image
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=3269&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className=" object-cover"
          /> */}
          <p className="py-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iusto
            facilis nulla porro numquam earum ab pariatur velit tempore animi
            sint molestiae illo maiores quod assumenda, magnam nobis. Aut
            tempora hic quis fugit nobis ratione libero facere laborum est!
            Dicta quam officia eos suscipit eveniet beatae, voluptatibus
            repellat aperiam placeat libero ipsum, nihil vero perferendis animi
            itaque provident ut sequi? Atque accusamus rem enim iure molestias,
            labore exercitationem! Deleniti maiores eos alias nulla porro dolor
            autem, sunt fugiat aliquam, sit nihil! Earum adipisci incidunt nisi,
            vitae amet quas similique soluta accusamus deserunt iste dolorem
            accusantium modi! Quae iste blanditiis molestiae quibusdam est quis
            sed in vel cumque voluptatem. Commodi alias possimus consequatur
            quos! Veniam saepe, molestias ullam et perspiciatis veritatis
            voluptatum quis aliquid, ut, corporis quo non ex porro distinctio?
            Deserunt fugiat adipisci mollitia aspernatur consequuntur ipsam! Rem
            totam sit asperiores hic libero modi quae, ipsam eius optio aliquam?
            Impedit tempore atque quam officiis? Dolorum, provident? Commodi
            repudiandae omnis ipsum sed nesciunt nobis consectetur. Nisi ad
            itaque vero animi porro delectus cum inventore optio, laudantium
            maxime beatae, illo impedit ut est at? Veniam, delectus. Recusandae
            aliquam laborum corrupti repellat ex tenetur vitae doloribus ipsa
            reiciendis corporis. Nemo similique aut ratione?
          </p>
          <h1 className="text-xl font-semibold border-b-2 text-slate-200">
            EECS9999 - Advanced Quantum Computing
          </h1>
          <QuestionModule />
        </div>
      </div>
      <div className=" flex-1 ">
        <div className="bg-rose-500 text-xl capitalize rounded-t-xl flex items-center justify-center w-48">
          <h1>students</h1>
        </div>
        {/* map the data */}
        <StudentName />
        <StudentName />
        <StudentName />
        <StudentName />
        <StudentName />
      </div>
    </div>
  );
};

export default ClassPage;
