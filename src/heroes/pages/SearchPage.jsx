import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { Notification } from "../../components/Notification";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";
export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search); // Extrae el valor de 'q' de la URL
  const heroes = getHeroesByName(q); // Obtiene los héroes que coinciden con la búsqueda

  const showNotification = q.length === 0; // Muestra la notificación si no hay valor de búsqueda
  const showNoResults = q.length > 0 && heroes.length === 0; // Muestra la notificación si no se encuentran héroes

  const { searchText, onInputChange, onResetForm } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim().length <= 1) return;
    navigate(`?q=${searchText.toLowerCase().trim()}`); // Navega a la ruta con el query string
    //onResetForm(); // Reinicia el formulario después de enviar
  };

  return (
    <>
      <div className="font-black text-2xl mb-6">Searching Page</div>
      <form
        aria-label="form"
        autoComplete="off"
        className="max-w-md mx-auto"
        onSubmit={onSearchSubmit}
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            name="searchText"
            value={searchText}
            onChange={onInputChange}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Heroes ..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="mt-6">
        <h2 className="font-black text-2xl mb-6">Results</h2>

        {/* Notificaciones */}
        {showNotification && (
          <Notification type="warning" message="No search value entered" />
        )}

        {showNoResults && (
          <Notification type="error" message={`No results found for "${q}"`} />
        )}

        {/* Resultados */}
        {!showNotification &&
          !showNoResults &&
          heroes.map((hero) => <HeroCard key={hero.id} {...hero} />)}
      </div>
    </>
  );
};
