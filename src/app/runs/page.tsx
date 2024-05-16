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
        {data.map((run) => (
          <RunCard key={run.id} run={run} />
        ))}
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
