import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import React, { useEffect, useState } from "react";

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [failedImage, setFailedImage] = useState(false);

  useEffect(() => {
    console.log("User info:", user);
  }, [user]);

  if (isLoading || !user) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        {failedImage ? (
          <CircleUserRound />
        ) : (
          <img src={user.picture} onError={() => setFailedImage(true)} alt={user.name} />
        )}
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}

export default Profile;
