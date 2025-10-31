import Loader from "../components/Loader";

export default function Loading() {
  console.log('running')
  return <Loader message="Fetching latest services..." />;
}
