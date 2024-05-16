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
  return (
    <div className="rounded-xl p-4">
      <h2 className="text-xl font-semibold">{run.distance}</h2>
      <p className="text-sm text-foreground/50">{run.description}</p>
      <p className="text-sm text-foreground/50">{}</p>
      <p className="text-sm text-foreground/50">{run.start_location}</p>
      <p className="text-sm text-foreground/50">{run.end_location}</p>
    </div>
  );
};

export default RunCard;
