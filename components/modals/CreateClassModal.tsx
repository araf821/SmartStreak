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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import FileUpload from "../FileUpload";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CreateClassModalProps {}

const formSchema = z.object({
  name: z.string().min(3).max(36),
  imageUrl: z.string().min(3),
  grade: z.coerce.number().min(1).max(12),
});

const CreateClassModal: FC<CreateClassModalProps> = ({}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      grade: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newClass = await axios.post("/api/class", values);

      toast.success("Class was created!");
      router.push(`/class/${newClass.data.classId}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

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
        <DialogContent className="border-slate-700 bg-slate-900">
          <DialogHeader className="space-y-0 text-left">
            <DialogTitle className="text-2xl md:text-3xl">
              Create a class
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Create a designated page for your students!
            </DialogDescription>
          </DialogHeader>
          <hr className="border-slate-700" />
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Class Banner</FormLabel>
                    <FormControl>
                      <div className="aspect-[5/2]">
                        <FileUpload
                          endPoint="image"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Class Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-lg font-semibold text-slate-200"
                        placeholder="Name of your class"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Class Grade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="w-full text-base font-semibold text-slate-300"
                        placeholder="7"
                        {...field}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button className="rounded-sm border border-indigo-500 bg-indigo-500 py-1.5 text-lg font-medium text-white transition hover:opacity-90">
                Create
              </button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateClassModal;
