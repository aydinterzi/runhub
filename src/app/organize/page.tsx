"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import db from "@/db";
import data from "@/db/data.json";
import { runs } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

enum Pace {
  Fast = "fast",
  Medium = "medium",
  Slow = "slow",
}

const { data: cities } = data;

const Page = () => {
  const [selectedStartingCity, setSelectedStartingCity] = useState("");
  const [selectedStartingDistrict, setSelectedStartingDistrict] = useState("");
  const [startingPointDetail, setStartingPointDetail] = useState("");
  const [selectedEndingCity, setSelectedEndingCity] = useState("");
  const [selectedEndingDistrict, setSelectedEndingDistrict] = useState("");
  const [endingPointDetail, setEndingPointDetail] = useState("");
  const [date, setDate] = useState<Date>();
  const [pace, setPace] = useState<Pace>();
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");

  const { userId } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleCreateRun = async () => {
    const schema = z.object({
      selectedStartingCity: z.string().min(1),
      selectedStartingDistrict: z.string().min(1),
      startingPointDetail: z.string().min(1),
      selectedEndingCity: z.string().min(1),
      selectedEndingDistrict: z.string().min(1),
      endingPointDetail: z.string().min(1),
      date: z.date().min(new Date()),
      pace: z.nativeEnum(Pace),
      distance: z.string().min(1),
      description: z.string().min(1),
    });

    try {
      schema.parse({
        selectedStartingCity,
        selectedStartingDistrict,
        startingPointDetail,
        selectedEndingCity,
        selectedEndingDistrict,
        endingPointDetail,
        date,
        pace,
        distance,
        description,
      });
      const res = await db.insert(runs).values({
        description,
        distance,
        date_time: date,
        pace,
        start_location: `${selectedStartingCity}, ${selectedStartingDistrict}, ${startingPointDetail}`,
        end_location: `${selectedEndingCity}, ${selectedEndingDistrict}, ${endingPointDetail}`,
        user_id: userId,
      });
      toast({
        title: "Success",
        description: "Run created successfully",
      });
      router.push("/");
    } catch (e) {
      console.error(e.errors);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all fields correctly",
      });
    }
  };

  return (
    <div className="w-full mt-8">
      <MaxWidthWrapper className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-40 items-center mb-6">
          <div className="flex flex-col gap-4 w-full">
            <p>Starting point</p>
            <Select
              onValueChange={(e) => setSelectedStartingCity(e)}
              value={selectedStartingCity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Provinces</SelectLabel>
                  {cities.map((item) => (
                    <SelectItem key={item.plaka_kodu} value={item.il_adi}>
                      {item.il_adi}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              disabled={!selectedStartingCity}
              onValueChange={(e) => setSelectedStartingDistrict(e)}
              value={selectedStartingDistrict}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Districts</SelectLabel>
                  {cities
                    .find((item) => item.il_adi === selectedStartingCity)
                    ?.ilceler.map((item) => (
                      <SelectItem key={item.ilce_kodu} value={item.ilce_adi}>
                        {item.ilce_adi}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Textarea
              className="resize-none"
              placeholder="Write more detail about starting point"
              value={startingPointDetail}
              onChange={(e) => setStartingPointDetail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <p>Ending point</p>
              <Select
                onValueChange={(e) => setSelectedEndingCity(e)}
                value={selectedEndingCity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Provinces</SelectLabel>
                    {cities.map((item) => (
                      <SelectItem key={item.plaka_kodu} value={item.il_adi}>
                        {item.il_adi}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                disabled={!selectedEndingCity}
                onValueChange={(e) => setSelectedEndingDistrict(e)}
                value={selectedEndingDistrict}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Districts</SelectLabel>
                    {cities
                      .find((item) => item.il_adi === selectedEndingCity)
                      ?.ilceler.map((item) => (
                        <SelectItem key={item.ilce_kodu} value={item.ilce_adi}>
                          {item.ilce_adi}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea
                className="resize-none"
                placeholder="Write more detail about ending point"
                value={endingPointDetail}
                onChange={(e) => setEndingPointDetail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-40 mt-20">
          <div className="flex flex-col gap-4 w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select onValueChange={(e) => setPace(e)} value={pace}>
              <SelectTrigger>
                <SelectValue placeholder="Select pace" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pace</SelectLabel>
                  <SelectItem value={Pace.Fast}>Fast</SelectItem>
                  <SelectItem value={Pace.Medium}>Medium</SelectItem>
                  <SelectItem value={Pace.Slow}>Slow</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              value={distance}
              placeholder="Enter distance"
              onChange={(e) => setDistance(e.target.value)}
            />
            <Textarea
              className="resize-none"
              value={description}
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <Button className="self-end mt-10" onClick={handleCreateRun}>
          Create run
        </Button>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
