import { useParams } from "react-router-dom";

export function UpdateIncident() {
  const { id } = useParams();
  return <h1>Update Incident ID: {id}</h1>;
}

export default UpdateIncident;