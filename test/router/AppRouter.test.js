import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

jest.spyOn(console, "warn").mockImplementation((message) => {
  if (!message.includes("React Router Future Flag Warning")) {
    console.warn(message);
  }
});

describe('Pruebas en <AppRouter />', () => {
    
    test('debe de mostrar el login si no estoy autenticado', () => {

        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={{ contextValue }}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        );
        expect(screen.getByLabelText('Sign in to your account')).toBeTruthy();
        expect(screen.getByLabelText('Email address')).toBeTruthy();
        
    });

    test('debe de morstar el componente de marvel si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        screen.debug();
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
        
    })
})