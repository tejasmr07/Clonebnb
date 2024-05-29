"use client";

import React, { Children, useEffect, useState } from "react";

interface ClinetOnlyProps {
  children: React.ReactNode;
}
const ClinetOnly: React.FC<ClinetOnlyProps> = (children) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return <>{Children}</>;
};

export default ClinetOnly;
