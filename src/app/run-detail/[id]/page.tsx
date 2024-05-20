import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import db from "@/db";
import { participants, runs } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { MoveRight } from "lucide-react";
import { redirect } from "next/navigation";
import { MapComponent } from "@/components/Map";
import { MapProvider } from "@/components/map-provider";
import { latlong } from "@/db/data2";
const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const data = await db.select().from(runs).where(eq(runs.id, params.id));
  const run = data[0];
  const [startProvince, startDistrict, startDetail] =
    run.start_location?.split(", ");
  const [endProvince, endDistrict, endDetail] = run.end_location?.split(", ");

  const findCity = latlong.find(
    (city) =>
      city.name.toLocaleLowerCase() === startProvince.toLocaleLowerCase()
  );

  async function handleJoinRun() {
    "use server";
    const res = await db.insert(participants).values({
      run_id: run.id,
      user_id: user?.id,
      status: "attending",
    });
    redirect("/runs");
  }
  return (
    <MapProvider>
      <form action={handleJoinRun} className="mt-10">
        <MaxWidthWrapper className="flex flex-col gap-10">
          <h1 className="text-bold text-3xl font-bold">Run detail</h1>
          <p>{run.description}</p>
          <div className="flex gap-20">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Start location</h3>
              <p>
                {startProvince}, {startDistrict}
              </p>
              <p>{startDetail}</p>
              <p>{run.pace}</p>
            </div>
            <div className="self-center">
              <MoveRight />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">End location</h3>
              <p>
                {endProvince}, {endDistrict}
              </p>
              <p>{endDetail}</p>
              <p>{run.distance}</p>
            </div>
            <MapComponent
              mapCenter={{
                lat: findCity?.coordinates.lat,
                lng: findCity?.coordinates.longitude,
              }}
            />
          </div>

          <div className="flex justify-between">
            <Button type="submit">Join</Button>
          </div>
        </MaxWidthWrapper>
      </form>
    </MapProvider>
  );
};

export default Page;
