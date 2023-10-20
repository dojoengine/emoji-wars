import { SetupNetworkResult } from "./setupNetwork";
import { Account } from "starknet";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { getEntityIdFromKeys, getEvents, setComponentsFromEvents } from "@dojoengine/utils";
import { EmojiIndex } from "../constants";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents }: SetupNetworkResult,
    { Position, Emoji }: ClientComponents
) {

    const spawn = async (signer: Account, x: string, y: string, emoji: EmojiIndex) => {


        const positionId = uuid();
        Position.addOverride(positionId, {
            entity: getEntityIdFromKeys([BigInt(x), BigInt(y)]),
            value: { vec: { x: x, y: y } },
        });

        const movesId = uuid();
        Emoji.addOverride(movesId, {
            entity: getEntityIdFromKeys([BigInt(x), BigInt(y)]),
            value: { emoji_type: emoji },
        });

        try {
            const tx = await execute(signer, "actions", 'spawn', [x, y, emoji]);
            setComponentsFromEvents(contractComponents,
                getEvents(
                    await signer.waitForTransaction(tx.transaction_hash,
                        { retryInterval: 100 }
                    )
                )
            );

        } catch (e) {
            console.log(e)
            Position.removeOverride(positionId);
            Emoji.removeOverride(movesId);
        } finally {
            Position.removeOverride(positionId);
            Emoji.removeOverride(movesId);
        }
    };

    return {
        spawn
    };
}

export enum Direction {
    Left = 1,
    Right = 2,
    Up = 3,
    Down = 4,
}
