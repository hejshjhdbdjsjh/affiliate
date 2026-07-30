export default function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center gap-0.5 text-yellow-400 text-xl">
      {'★'.repeat(full)}
      {half === 1 && '★'}
      {'☆'.repeat(empty)}
    </div>
  );
}
