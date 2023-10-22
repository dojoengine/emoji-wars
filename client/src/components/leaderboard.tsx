import { EmojiMap, ReverseEmojiMap } from "../constants";
import { EmojiCount } from "./emojicount";

export const LeaderBoard = () => {

    return (
        <div>
            <div className="flex space-x-2 border justify-between">
                {Object.entries(EmojiMap).map(([key, emoji]) => (
                    <EmojiCount key={key} emoji_id={ReverseEmojiMap[emoji]} />
                ))}
            </div>

        </div>
    )
}