import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../DojoContext";
import { useComponentValue } from "@latticexyz/react";
import { EmojiMap } from "../constants";
import React, { useState, useEffect, useMemo } from 'react';

export const EmojiCount = ({ emoji_id }: any) => {
    const {
        setup: {
            components
        },
    } = useDojo();

    const emoji_count = useComponentValue(components.Count, getEntityIdFromKeys([BigInt(emoji_id)]));
    const emoji_time_out = useComponentValue(components.EmojiTimeOut, getEntityIdFromKeys([BigInt(emoji_id)]));

    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = emoji_time_out ? emoji_time_out.time - currentTime : 0;

    const [countdown, setCountdown] = useState(remainingTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prevCountdown => Math.max(prevCountdown - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCountdown(remainingTime);  // Reset the countdown whenever emoji_time_out changes
    }, [emoji_time_out]);

    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;

    const formattedCountdown = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className="flex flex-col space-x-1 px-2">
            <div>
                {EmojiMap[emoji_id]}  {emoji_count ? emoji_count.count : 0}
            </div>
            <div>
                {formattedCountdown}
            </div>
        </div>
    )
}