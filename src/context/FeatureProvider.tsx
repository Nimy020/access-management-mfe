import React, { createContext, useEffect, useState } from "react";
import { FeatureState } from "../components/Interface";

interface FeatureContextType {
  featureState: FeatureState;
  setFeatureState: (action: any) => void;
  isEditable: boolean;
  setIsEditable: (param: any) => void;
}

export const FeatureContext = createContext<FeatureContextType | undefined>(
  undefined
);

export const FeatureProvider: React.FC = ({ children }) => {
  const [featureState, setFeatureState] = useState({
    subFeatures: null,
    featureId: null,
    featureName: null,
    featureDescription: null,
  });
  const [isEditable, setIsEditable] = useState(false);

  const FeatureContextValue: FeatureContextType = {
    featureState,
    setFeatureState,
    isEditable,
    setIsEditable,
  };

  useEffect(() => {
    setIsEditable(false);
  }, [location]);

  return (
    <FeatureContext.Provider value={FeatureContextValue}>
      {children}
    </FeatureContext.Provider>
  );
};
