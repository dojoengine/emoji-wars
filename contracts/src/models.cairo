use array::ArrayTrait;
use core::debug::PrintTrait;
use starknet::ContractAddress;
use dojo::database::schema::{
    Enum, Member, Ty, Struct, SchemaIntrospection, serialize_member, serialize_member_type
};

#[derive(Copy, Drop, Serde, Print, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}

#[derive(Model, Copy, Drop, Print, Serde)]
struct Position {
    #[key]
    x: u32,
    #[key]
    y: u32,
    vec: Vec2,
}

#[derive(Model, Copy, Drop, Print, Serde)]
struct Emoji {
    #[key]
    x: u32,
    #[key]
    y: u32,
    emoji_type: u8,
}

#[derive(Model, Copy, Drop, Print, Serde)]
struct Owner {
    #[key]
    x: u32,
    #[key]
    y: u32,
    player: ContractAddress,
}

#[derive(Model, Copy, Drop, Print, Serde)]
struct TimeOut {
    #[key]
    x: u32,
    #[key]
    y: u32,
    time: u64,
}


trait Vec2Trait {
    fn is_zero(self: Vec2) -> bool;
    fn is_equal(self: Vec2, b: Vec2) -> bool;
}

impl Vec2Impl of Vec2Trait {
    fn is_zero(self: Vec2) -> bool {
        if self.x - self.y == 0 {
            return true;
        }
        false
    }

    fn is_equal(self: Vec2, b: Vec2) -> bool {
        self.x == b.x && self.y == b.y
    }
}

#[cfg(test)]
mod tests {
    use debug::PrintTrait;
    use super::{Position, Vec2, Vec2Trait};

    #[test]
    #[available_gas(100000)]
    fn test_vec_is_zero() {
        assert(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), 'not zero');
    }

    #[test]
    #[available_gas(100000)]
    fn test_vec_is_equal() {
        let position = Vec2 { x: 420, y: 0 };
        assert(position.is_equal(Vec2 { x: 420, y: 0 }), 'not equal');
    }
}
