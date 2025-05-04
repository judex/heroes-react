import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context";
import { Navbar } from "../../../src/ui";

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

describe("Pruebas en <Navbar />", () => {
  const contexValue = {
    logged: true,
    user: { name: "Fernando" },
    logout: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks()); // 100% limpiar los mocks antes de cada prueba

  test("debe de mostrar el nombre del usuario logeado", () => {
    render(
      <AuthContext.Provider value={contexValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    // screen.debug();
    expect(screen.getByText("Fernando")).toBeTruthy();
  });
  test("debe de llamar el logout y navigate cuando se hace click en el boton", () => {
    render(
      <AuthContext.Provider value={contexValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const logoutButton = screen.getByLabelText("Logout");
    // screen.debug(logoutButton);
    fireEvent.click(logoutButton);
    expect(contexValue.logout).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
