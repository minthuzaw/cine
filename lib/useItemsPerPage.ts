import { useEffect, useState } from 'react';

export default function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(5); // default for lg

  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;
      if (width >= 1536) { // 2xl
        setItemsPerPage(6);
      } else if (width >= 1280) { // xl
        setItemsPerPage(5);
      } else if (width >= 1024) { // lg
        setItemsPerPage(4);
      } else if (width >= 768) { // md
        setItemsPerPage(3);
      } else if (width >= 375) { // small phones (375px and up)
        setItemsPerPage(2);
      } else { // xs phones (below 375px)
        setItemsPerPage(1);
      }
    };

    updateItems(); // Set initial value
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  return itemsPerPage;
}
