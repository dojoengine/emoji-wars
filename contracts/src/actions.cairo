use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo_examples::models::{Position};
use dojo_examples::models::{Vec2, Emoji, TimeOut, Owner};
use starknet::{ContractAddress, ClassHash};

// define the interface
#[starknet::interface]
trait IActions<TContractState> {
    fn spawn(self: @TContractState, vec: Vec2, emoji_type: u8);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_examples::models::{Position, Vec2, Emoji, TimeOut, Owner};
    use super::IActions;

    const TIME_OUT: u64 = 1000;

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
            let (position, time_out) = get!(world, (vec.x, vec.y), (Position, TimeOut));

            // Update the world state with the new data.
            // 1. Increase the player's remaining moves by 10.
            // 2. Move the player's position 10 units in both the x and y direction.
            set!(
                world,
                (
                    Position { x: vec.x, y: vec.y, vec: Vec2 { x: vec.x, y: vec.y } },
                    Emoji { x: vec.x, y: vec.y, emoji_type },
                    TimeOut { x: vec.x, y: vec.y, time: time + TIME_OUT },
                    Owner { x: vec.x, y: vec.y, player }
                )
            );
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
    use dojo_examples::models::{position, emoji, time_out, owner};
    use dojo_examples::models::{Position, Vec2, Emoji, TimeOut, Owner};

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
            owner::TEST_CLASS_HASH
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
