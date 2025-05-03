import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

jest.spyOn(console, "warn").mockImplementation((message) => {
  if (!message.includes("React Router Future Flag Warning")) {
    console.warn(message);
  }
});

describe('Prueba en <PrivateRoute />', () => { 
    test('debe de mostrar el children si está autenticado', () => {
        Storage.prototype.setItem = jest.fn();
        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>  
                <MemoryRouter>
                    <PrivateRoute> 
                        <h1>Ruta privada</h1>
                    </PrivateRoute>                
                </MemoryRouter>    
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/");
    });
 })