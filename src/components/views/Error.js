import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  return (
    <section>
      <h2>cant find page! </h2>
      <h2>Thats..akward! please, make a u-turn</h2>

      <button onClick={() => navigate(-1)}>Go back</button>
    </section>
  );
}
