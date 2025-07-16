import { useEffect, useState } from "react";
import axios from "axios";

interface BannerData {
  title: string;
  description: string;
  imageUrl: string;
}

export function getBannerData(type: string) {
  const [banner, setBanner] = useState<BannerData | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`/api/banner?type=${type}`);
        if (res.status === 200 && res.data?.banners?.length > 0) {
          const found = res.data.banners.find(
            (b: any) => b.type.toLowerCase() === type.toLowerCase()
          );
          if (found) {
            setBanner({
              title: found.title,
              description: found.description,
              imageUrl: found.imageUrl,
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch banner:", err);
      }
    };

    fetchBanner();
  }, [type]);

  return banner;
}
