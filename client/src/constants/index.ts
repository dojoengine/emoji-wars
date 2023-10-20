// enum of 10 emojis

export enum EmojiIndex {
    eggplant = 1,
    bicycle = 2,
    ghost = 3,
    top_hat = 4,
    castle = 5,
    rocket = 6,
    saxophone = 7,
    pineapple = 8,
    socks = 9,
    tornado = 10,
}

export const EmojiMap: { [index: number]: string } = {
    [EmojiIndex.eggplant]: "🍆",
    [EmojiIndex.bicycle]: "🚲",
    [EmojiIndex.ghost]: "👻",
    [EmojiIndex.top_hat]: "🎩",
    [EmojiIndex.castle]: "🏰",
    [EmojiIndex.rocket]: "🚀",
    [EmojiIndex.saxophone]: "🎷",
    [EmojiIndex.pineapple]: "🍍",
    [EmojiIndex.socks]: "🧦",
    [EmojiIndex.tornado]: "🌪️",
};


export const ReverseEmojiMap: { [emoji: string]: EmojiIndex } = Object.entries(EmojiMap).reduce(
    (acc, [key, value]) => ({ ...acc, [value]: +key }),
    {}
);