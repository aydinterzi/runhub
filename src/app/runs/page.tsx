import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RunCard from "@/components/RunCard";
import db from "@/db";
import { runs } from "@/db/schema";
const Page = async () => {
  const data = await db.select().from(runs);
  console.log(data);

  return (
    <div>
      <MaxWidthWrapper>
        <div className="mt-10 flex gap-10">
          {data.map((run) => (
            <RunCard key={run.id} run={run} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
