import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

jest.spyOn(console, "warn").mockImplementation((message) => {
  if (!message.includes("React Router Future Flag Warning")) {
    console.warn(message);
  }
});

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("Pruebas en <SearchPage />", () => {
  beforeEach(() => jest.clearAllMocks()); // 100% limpiar los mocks antes de cada prueba
  const urlTemp = "batman";
  test("debe de mostrar el componente sin heroes que es por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    // screen.debug();
    expect(container).toMatchSnapshot();
    expect(screen.getByText("Searching Page")).toBeTruthy();
  });
  test("debe de mostrar a batman y el input con el valor del query string", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/search?q=${urlTemp}`]}>
        <SearchPage />
      </MemoryRouter>
    );
    // screen.debug();
    // expect(container).toMatchSnapshot();
    const input = screen.getByRole("searchbox");
    expect(input.value).toBe(urlTemp);
    const img = screen.getByRole("img", { name: "Batman" });
    screen.debug(img);
    expect(img).toBeTruthy();
    expect(img.src).toContain("/heroes/dc-batman.jpg");
    const nroPalabras = urlTemp.length === 0;
    expect(nroPalabras).toBeFalsy();
    expect(screen.queryByText("No heroes found")).toBeFalsy();
  });

  test("debe de mostrar un error si no se encuentran el hero (batman123)", () => {
    const heroeSearch = "batman123";
    render(
      <MemoryRouter initialEntries={[`/search?q=${heroeSearch}`]}>
        <SearchPage />
      </MemoryRouter>
    );
    // screen.debug();
    expect(
      screen.getByText(`No results found for "${heroeSearch}"`)
    ).toBeTruthy();
  });

  test("debe de llamar el navigate a la ruta ", () => {
    const heroeSearch = "superman";

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );
    screen.debug();
    const input = screen.getByRole("searchbox");
    // screen.debug(input);
    fireEvent.change(input, {
      target: { name: "searchText", value: heroeSearch },
    });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${heroeSearch}`);
  });
});
