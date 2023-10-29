"use client";

import { Plus } from "lucide-react";
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface CreateClassModalProps {}

const CreateClassModal: FC<CreateClassModalProps> = ({}) => {
  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-xl border border-slate-700 bg-slate-900">
      <p className="text-2xl font-semibold">
        <span className="text-indigo-500">Create</span> a class
      </p>
      <Dialog>
        <DialogTrigger>
          <button className="aspect-square rounded-md border-2 border-indigo-500">
            <Plus className="h-10 w-10 text-indigo-500" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
            <DialogDescription>
              Create a designated page for your students.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateClassModal;
