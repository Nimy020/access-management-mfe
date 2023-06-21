import { createContext, useState, ReactNode, useEffect } from "react";

interface NavigationContextProps {
  previousPageName: any;
  setPreviousPageName: (pageName: any) => void;
}

export const NavigationContext = createContext<NavigationContextProps>({
  previousPageName: [],
  setPreviousPageName: () => {},
});

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [previousPageName, setPreviousPageName] = useState([]);

  useEffect(() => {
    if (location.pathname !== "/csc-agent-platform/admin/access-management")
      setPreviousPageName(["Dashboard"]);
  }, []);
  
  return (
    <NavigationContext.Provider
      value={{ previousPageName, setPreviousPageName }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
