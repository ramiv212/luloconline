import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection:"column",height:"100vh"}}>
        <div style={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection:"column",width:"100%",backgroundColor:'white',padding:'70px'}}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
        </div>
    </div>
  );
}