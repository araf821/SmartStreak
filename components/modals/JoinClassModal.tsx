"use client";

import { Plus } from "lucide-react";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface JoinClassModalProps {}

const JoinClassModal: FC<JoinClassModalProps> = ({}) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-xl border border-slate-700 bg-slate-900">
      <p className="text-2xl font-semibold">
        <span className="text-indigo-500">Join</span> a class
      </p>
      <Dialog>
        <DialogTrigger>
          <button className="aspect-square rounded-md border-2 border-indigo-500">
            <Plus className="h-10 w-10 text-indigo-500" />
          </button>
        </DialogTrigger>
        <DialogContent className="border-slate-700 bg-slate-900">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-2xl md:text-3xl">
              Join a class
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Ask your teacher for an invite code!
            </DialogDescription>
          </DialogHeader>
          <hr className="border-slate-700" />
          <div className="space-y-1">
            <Label className="md:text-lg">Enter Invite Code</Label>
            <Input
              name="inviteCode"
              className="text-lg font-semibold text-slate-200"
              placeholder="Invite Code"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </div>
          <button className="rounded-sm border border-indigo-500 bg-indigo-500 py-1.5 text-lg font-medium text-white transition hover:opacity-90">
            Join
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JoinClassModal;
