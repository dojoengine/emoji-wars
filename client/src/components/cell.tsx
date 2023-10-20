import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../DojoContext";
import { useComponentValue } from "@latticexyz/react";
import { EmojiMap } from "../constants";

export const Cell = ({ x, y, emoji }: any) => {

    const {
        setup: {
            systemCalls: { spawn },
            components
        },
        account: { account }
    } = useDojo();

    const emoji_component = useComponentValue(components.Emoji, getEntityIdFromKeys([BigInt(x), BigInt(y)]));
    const time_out = useComponentValue(components.Emoji, getEntityIdFromKeys([BigInt(x), BigInt(y)]));

    const isPast = time_out && new Date(time_out * 1000) < new Date();

    return (
        <div
            onClick={() => spawn(account, x, y, emoji)}
            className={`cell ${isPast ? "green-bg" : ""}`}
        >
            {emoji_component ? EmojiMap[emoji_component.emoji_type] : ""}
        </div>
    )
}