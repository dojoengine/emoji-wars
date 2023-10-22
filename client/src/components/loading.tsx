import { useEffect, useState } from "react";
import { EmojiIndex, EmojiMap } from "../constants";

const LoadingEmoji: React.FC = () => {
    const [currentEmoji, setCurrentEmoji] = useState(EmojiIndex.eggplant);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentEmoji(prev => {
                if (prev === EmojiIndex.tornado) {
                    return EmojiIndex.eggplant;
                }
                return prev + 1;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return <span className="text-2xl">{EmojiMap[currentEmoji]}</span>;
}

export default LoadingEmoji;


