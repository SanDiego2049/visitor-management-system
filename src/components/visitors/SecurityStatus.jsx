import React, { useState, useEffect } from "react";

const SecurityStatus = () => {
  const [securityStatus, setSecurityStatus] = useState({});

  useEffect(() => {
    // Simulating fetching visit summary data
      setSecurityStatus({
        idValidated: true,
        badgeIssued: true,
        clearanceComplete: true,
      });
  }, []);

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Security Check-In Status</h2>
      <ul className="space-y-2">
        <li>ID Validated: {securityStatus.idValidated ? "✅" : "❌"}</li>
        <li>Badge Issued: {securityStatus.badgeIssued ? "✅" : "❌"}</li>
        <li>Clearance: {securityStatus.clearanceComplete ? "✅" : "❌"}</li>
      </ul>
    </section>
  );
};

export default SecurityStatus;
