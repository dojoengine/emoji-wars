use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo_examples::models::{Position};
use dojo_examples::models::{Vec2, Emoji, TimeOut, Owner};
use starknet::{ContractAddress, ClassHash};

// define the interface
#[starknet::interface]
trait IActions<TContractState> {
    fn spawn(self: @TContractState, vec: Vec2, emoji_type: u8);
    fn check_cell_time_out(self: @TContractState, vec: Vec2) -> u64;
    fn check_emoji_time_out(self: @TContractState, emoji_type: u8) -> u64;
}

// dojo decorator
#[dojo::contract]
mod actions {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_examples::models::{
        Position, Vec2, Emoji, TimeOut, Owner, EmojiTimeOut, EmojiTrait, Count
    };
    use super::IActions;

    const CELL_TIME_OUT: u64 = 1000;
    const EMOJI_TIME_OUT: u64 = 300;

    // impl: implement functions specified in trait
    #[external(v0)]
    impl ActionsImpl of IActions<ContractState> {
        // ContractState is defined by system decorator expansion
        fn spawn(self: @ContractState, vec: Vec2, emoji_type: u8) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let time = get_block_timestamp();

            // Retrieve the player's current position from the world.
            let (position, time_out, emoji) = get!(
                world, (vec.x, vec.y), (Position, TimeOut, Emoji)
            );

            let mut emoij_count = get!(world, emoji_type, Count);

            // can't set on exising emoji
            assert(emoji.emoji_type != emoji_type, 'Emoji already exists');

            // check time out
            assert(time_out.time < time, 'Time not reached');

            // check emoji time out
            let emoji_time_out = get!(world, emoji_type, EmojiTimeOut);
            assert(emoji_time_out.time < time, 'Emoji not ready');

            // convert neighbours
            emoji.convert_neighbours(world, emoji_type);

            set!(
                world,
                (
                    Position { x: vec.x, y: vec.y, vec: Vec2 { x: vec.x, y: vec.y } },
                    Emoji { x: vec.x, y: vec.y, emoji_type },
                    TimeOut { x: vec.x, y: vec.y, time: time + CELL_TIME_OUT },
                    Owner { x: vec.x, y: vec.y, player },
                    EmojiTimeOut { emoji_type, time: time + EMOJI_TIME_OUT },
                    Count { emoji_type, count: emoij_count.count + 1 }
                )
            );
        }

        fn check_cell_time_out(self: @ContractState, vec: Vec2) -> u64 {
            let time_out = get!(self.world_dispatcher.read(), (vec.x, vec.y), TimeOut);

            time_out.time
        }

        fn check_emoji_time_out(self: @ContractState, emoji_type: u8) -> u64 {
            let emoji_time_out = get!(self.world_dispatcher.read(), emoji_type, EmojiTimeOut);

            emoji_time_out.time
        }
    }
}

#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;

    // import world dispatcher
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    // import models
    use dojo_examples::models::{position, emoji, time_out, owner, emoji_time_out};
    use dojo_examples::models::{Position, Vec2, Emoji, TimeOut, Owner, EmojiTimeOut};

    // import actions
    use super::{actions, IActionsDispatcher, IActionsDispatcherTrait};

    #[test]
    #[available_gas(30000000)]
    fn test_move() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![
            position::TEST_CLASS_HASH,
            emoji::TEST_CLASS_HASH,
            time_out::TEST_CLASS_HASH,
            owner::TEST_CLASS_HASH,
            emoji_time_out::TEST_CLASS_HASH
        ];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };

        // call spawn()
        actions_system.spawn();

        // get new_position
        let new_position = get!(world, caller, Position);
    }
}
