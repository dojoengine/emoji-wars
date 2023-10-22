## Emoji wars

Emoji wars is an emoji sandbox, designed for chaos and fun.

### It is designed a persistent world that is owned by the community.

The world is a 2d grid of tiles with emojis aiming for domination.

### Systems

The goal of emoji wars is for new systems to be implemented frequently and world resets to happen often. Everything is open and anyone can publish a system into the world.

There is only 1 enshrined system, and that is of the emojis placement and the grids.

### How does this work?

There is a special system called `open_auth` that allows developers to call with their new system address and then those systems will then be able to act on the enshrined system.


**Prerequisites:** First and foremost, ensure that Dojo is installed on your system. If it isn't, you can easily get it set up with:

```console
curl -L https://install.dojoengine.org | bash
```

Followed by:

```console
dojoup    
```

For an in-depth setup guide, consult the [Dojo book](https://book.dojoengine.org/getting-started/quick-start.html).

### Launch the Example in Under 30 Seconds

After cloning the project, execute the following:

1. **Terminal 1 - Katana**:

```console
cd contracts && katana --disable-fee
```

2. **Terminal 2 - Contracts**:

```console
cd contracts && sozo build && sozo migrate

// Basic Auth - This will allow burner Accounts to interact with the contracts
sh ./contracts/scripts/default_auth.sh
```

3. **Terminal 3 - Client**:

```console
cd client && yarn && yarn dev
```

or if using bun

```console
cd client && bun install && bun dev
```

4. **Terminal 4 - Torii**:

```console
cd dojo-starter && torii --world <WORLD>
```

Upon completion, launch your browser and navigate to http://localhost:5173/. You'll be greeted by the running example!


## Production
sozo --release migrate --rpc-url https://api.cartridge.gg/x/emoji-wars/katana