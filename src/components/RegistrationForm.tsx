"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { universities } from "@/types/list-of-uni";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormInputs = {
  id?: string;
  fullName: string;
  photo: FileList | string;
  phoneNumber: string;
  university: string;
  responsibility: string;
  honor: string;
  barcode?: string;
  gender?: string;
};

const responsibilities = [
  "BUB",
  "Chess",
  "Football",
  "Gebeta",
  "Taekwondo",
  "100m",
  "200m",
  "400m",
  "4X100m",
  "4X400m",
  "1500m",
  "3000m",
];

const gender = ["Female", "Male"];

interface RegistrationFormProps {
  editingParticipant?: FormInputs | null;
}

export function RegistrationForm({ editingParticipant }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      responsibility: "",
      honor: "",
      gender: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResponsibility, setLastResponsibility] = useState<string>(
    responsibilities[0]
  );

  useEffect(() => {
    if (editingParticipant) {
      reset(editingParticipant);
      setPhotoPreview(editingParticipant.photo as string);
      setLastResponsibility(editingParticipant.responsibility);
    } else {
      reset({ responsibility: lastResponsibility });
    }
  }, [editingParticipant, reset, setValue]);

  const onSubmitForm: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    try {
      setIsSubmitting(true);

      const payload = {
        id: data?.id,
        fullName: data.fullName,
        university: data.university,
        responsibility: data.responsibility,
        honor: data.honor !== "None" ? data.honor : "",
        gender: data.gender,
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form. Status: ${response.status}`);
      }

      console.log("Participant successfully registered.");

      // Store the last responsibility
      setLastResponsibility(data.responsibility);

      // Reset form to initial state
      reset({
        fullName: "",
        photo: "",
        university: "",
        gender: "",
        responsibility: data.responsibility, // Keep the last selected responsibility
        honor: "",
      });

      // Clear photo preview
      setPhotoPreview(null);

      // Reset file input
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error submitting participant:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-bold text-amber-600 dark:text-blue-300">
          Welcome To The USAE Sport Festival
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="ID">USAE ID</Label>
          <Input
            id="ID"
            {...register("id", { required: "USAE ID is required" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="gender">Select gender</Label>
          <Select
            onValueChange={(value) => {
              setValue("gender", value);
            }}
            value={watch("gender")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {gender.map((resp) => (
                <SelectItem key={resp} value={resp}>
                  {resp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">
              {errors.gender.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="university">University</Label>
          <Select
            onValueChange={(value) => {
              setValue("university", value);
            }}
            value={watch("university")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your university" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((uni) => (
                <SelectItem key={uni.name} value={uni.name}>
                  {uni.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.university && (
            <p className="text-red-500 text-xs mt-1">
              {errors.university.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="responsibility">Responsibility</Label>
          <Select
            onValueChange={(value) => {
              setValue("responsibility", value);
              setLastResponsibility(value);
            }}
            value={watch("responsibility") || lastResponsibility}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a responsibility" />
            </SelectTrigger>
            <SelectContent>
              {responsibilities.map((resp) => (
                <SelectItem key={resp} value={resp}>
                  {resp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.responsibility && (
            <p className="text-red-500 text-xs mt-1">
              {errors.responsibility.message}
            </p>
          )}
        </div>

        <div className="flex justify-center items-center">
          <Button type="submit" disabled={isSubmitting} className="items-center">
            {isSubmitting
              ? "Submitting..."
              : editingParticipant
              ? "Update Participant"
              : "Register Participant"}
          </Button>
        </div>
      </form>
    </div>
  );
}
