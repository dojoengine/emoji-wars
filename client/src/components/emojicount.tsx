import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../DojoContext";
import { useComponentValue } from "@latticexyz/react";
import { EmojiMap } from "../constants";

export const EmojiCount = ({ emoji_id }: any) => {
    const {
        setup: {
            components
        },
    } = useDojo();

    const emoji_count = useComponentValue(components.Count, getEntityIdFromKeys([BigInt(emoji_id)]));

    console.log(emoji_count)

    return <div className=" flex space-x-1 px-2">
        <div>
            {EmojiMap[emoji_id]}
        </div>
        <div>
            {emoji_count ? emoji_count.count : 0}
        </div>

    </div>
}