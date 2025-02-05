import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  const [videos, setvideos] = useState<IVideo[]>([])

  useEffect(()=>{
    const fetchVideo = async () => {
      try {
      const data = await apiClient.getVideos();
      setvideos(data);
      } catch (error) {
        console.error("Error fetching videos",error)
      }
    }

    fetchVideo();

  },[])

  return (
    <div>
      <h1>Home - chai aur coffe</h1>
    </div>
  );
}
