import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { term } = useParams();

  const search = (ev) => {
    ev.preventDefault();
    const searchTerm = ev.target.value.trim();
    if (searchTerm) {
      setLoading(true);
      navigate(`/search/${searchTerm}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      {loading && <Spinner />}{" "}
      {/* Display the Spinner component when loading is true */}
      <form
        autocomplete="off
        "
        action={search}
      >
        <div class="autocomplete" style="width:300px;">
          <input value={term} />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Search;