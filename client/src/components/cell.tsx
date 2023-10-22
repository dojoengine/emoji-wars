import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../DojoContext";
import { useComponentValue } from "@latticexyz/react";
import { EmojiMap } from "../constants";
import { useState } from "react";

export const Cell = ({ x, y, emoji }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    const {
        setup: {
            systemCalls: { spawn },
            components
        },
        account: { account }
    } = useDojo();

    const emoji_component = useComponentValue(components.Emoji, getEntityIdFromKeys([BigInt(x), BigInt(y)]));

    const time_out = useComponentValue(components.TimeOut, getEntityIdFromKeys([BigInt(x), BigInt(y)]));

    const currentTime = Math.floor(Date.now() / 1000);

    const isTimeoutPast = time_out ? time_out.time <= currentTime : false;

    return (
        <div
            onClick={() => spawn(account, x, y, emoji)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`cell  ${emoji_component && emoji_component.emoji_type != 0 ? (isTimeoutPast ? 'bg-green-100' : 'bg-red-100') : ''}`}
        >
            {isHovered ? EmojiMap[emoji] : (emoji_component ? EmojiMap[emoji_component.emoji_type] : "")}
        </div>
    );
}





