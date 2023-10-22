use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo_examples::models::{Position};
use dojo_examples::models::{Vec2, Emoji, TimeOut, Owner};
use starknet::{ContractAddress, ClassHash};

// define the interface
#[starknet::interface]
trait IAuth<TContractState> {
    fn open_auth(self: @TContractState, address: ContractAddress);
}

// dojo decorator
#[dojo::contract]
mod auth {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_examples::models::{
        Position, Vec2, Emoji, TimeOut, Owner, EmojiTimeOut, EmojiTrait, Count
    };
    use super::IAuth;

    #[external(v0)]
    impl ActionsImpl of IAuth<ContractState> {
        // ContractState is defined by system decorator expansion
        fn open_auth(self: @ContractState, address: ContractAddress) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();
            world.grant_writer('Position'.into(), address);
            world.grant_writer('Emoji'.into(), address);
            world.grant_writer('TimeOut'.into(), address);
            world.grant_writer('Owner'.into(), address);
            world.grant_writer('EmojiTimeOut'.into(), address);
            world.grant_writer('EmojiTrait'.into(), address);
            world.grant_writer('Count'.into(), address);
        }
    }
}
