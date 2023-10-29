"use client";

import { z } from "zod";
import FileUpload from "./FileUpload";
import { useClerk, useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(3).max(16),
  imageUrl: z.string().min(3),
  profileType: z.enum(["STUDENT", "TEACHER"]),
  grade: z.coerce.number().min(1).max(12),
});

const ProfileCreationForm = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      grade: 1,
      profileType: "STUDENT",
    },
  });

  // Initialize default values
  useEffect(() => {
    if (user) {
      form.setValue("name", user.fullName || "");
      form.setValue("imageUrl", user.imageUrl);
    }
  }, [form, user]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/profile", values);
      toast.success("Profile created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem className="aspect-square w-full max-w-[200px] max-md:mx-auto">
                <FormControl>
                  <FileUpload
                    endPoint="image"
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="pt-4 space-y-1">
                <FormLabel className="text-base lg:text-lg font-medium">
                  Your name
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full text-slate-300 text-base font-semibold"
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="grade"
            control={form.control}
            render={({ field }) => (
              <FormItem className="pt-4 space-y-1">
                <FormLabel className="text-base lg:text-lg font-medium">
                  Your grade
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="w-full text-slate-300 text-base font-semibold"
                    placeholder="7"
                    {...field}
                    onChange={(event) => field.onChange(event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="profileType"
            control={form.control}
            render={({ field }) => (
              <FormItem className="pt-4 space-y-1">
                <FormLabel className="text-base lg:text-lg">
                  Are you a student or a teacher?
                </FormLabel>
                <p className="text-sm">
                  You won&rsquo;t be able to change this later.
                </p>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex pt-2 gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="text-red-600"
                          value="STUDENT"
                        />
                      </FormControl>
                      <FormLabel className="text-base">Student</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="text-red-600"
                          value="TEACHER"
                        />
                      </FormControl>
                      <FormLabel className="text-base">Teacher</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-8 flex gap-6 justify-between md:justify-normal">
            <button
              type="button"
              className="w-32 transition hover:bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-400 font-semibold text-lg py-1 px-2"
              onClick={() => signOut(() => router.push("/"))}
            >
              Cancel
            </button>
            <button className="w-32 transition hover:text-white hover:bg-indigo-500 border-2 border-indigo-500 rounded-lg text-indigo-500 font-semibold text-lg py-1 px-2">
              Create
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileCreationForm;
