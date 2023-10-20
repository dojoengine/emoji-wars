/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@latticexyz/recs";

export function defineContractComponents(world: World) {
  return {
    Position: (() => {
      const name = "Position";
      return defineComponent(
        world,
        {
          vec: {
            x: RecsType.Number,
            y: RecsType.Number,
          },
        },
        {
          metadata: {
            name: name,
            types: ["Vec2"],
          },
        }
      );
    })(),
    Emoji: (() => {
      const name = "Emoji";
      return defineComponent(
        world,
        {
          emoji_type: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u8"],
          },
        }
      );
    })(),
    Owner: (() => {
      const name = "Owner";
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
        },
        {
          metadata: {
            name: name,
            types: ["ContractAddress"],
          },
        }
      );
    })(),
  };
}
