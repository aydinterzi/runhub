import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RunCard from "@/components/RunCard";
import db from "@/db";
import { runs } from "@/db/schema";
import { unstable_noStore as noStore } from "next/cache";
const Page = async () => {
  noStore();
  const data = await db.select().from(runs);
  console.log(data);
  return (
    <div className="mt-10">
      <MaxWidthWrapper>
        <div className="flex flex-wrap gap-10">
          {data.map((run) => (
            <RunCard key={run.id} run={run} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
