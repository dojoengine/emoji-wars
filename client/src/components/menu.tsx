import { useEffect, useRef } from 'react';
import { EmojiMap, ReverseEmojiMap } from '../constants';

export const EmojiContextMenu = ({ position, onSelect, onClose }: any) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();  // Close the menu when clicking outside of it
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    return (
        position ? (
            <div
                ref={menuRef}
                className="absolute z-100 bg-white grid grid-cols-2 gap-1"
                style={{ top: position.y, left: position.x }}
            >
                {Object.entries(EmojiMap).map(([key, emoji]) => (
                    <div
                        key={key}
                        className="hover:bg-gray-200 cursor-pointer p-2 "
                        onClick={() => onSelect(ReverseEmojiMap[emoji])}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
        ) : null
    );
};