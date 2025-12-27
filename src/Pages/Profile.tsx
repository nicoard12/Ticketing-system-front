import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";

//TODO: Proteger la pagina para que solo el usuario logueado pueda ver su perfil

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [failedImage, setFailedImage] = useState(false);


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
