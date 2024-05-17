import { MoveRight } from "lucide-react";
import Link from "next/link";

type Run = {
  id: number;
  user_id: string | null;
  start_location: string | null;
  end_location: string | null;
  distance: string | null;
  date_time: Date | null;
  pace: "fast" | "medium" | "slow" | null;
  description: string | null;
};

const RunCard = ({ run }: { run: Run }) => {
  const [startProvince, startDistrict, startDetail] =
    run.start_location?.split(", ");
  const [endProvince, endDistrict, endDetail] = run.end_location?.split(", ");
  return (
    <Link
      href={`run-detail/${run.id}`}
      className="rounded-xl p-4 border flex justify-between w-[400px] shadow-lg"
    >
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <p>
            {startProvince}, {startDistrict}
          </p>
          <p>{startDetail}</p>
        </div>
        <p>{run.pace}</p>
      </div>
      <div className="self-center">
        <MoveRight />
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <p>
            {endProvince}, {endDistrict}
          </p>
          <p>{endDetail}</p>
        </div>
        <p>{run.distance}</p>
      </div>
    </Link>
  );
};

export default RunCard;