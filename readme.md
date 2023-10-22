## Emoji Wars 🌍💥

Emoji Wars 🚀 is an emoji sandbox 🏖, designed for chaos 🌀 and fun 🎉.

### It's designed as a persistent world 🌐 that's owned by the community 👥.

This world 🌍 is a 2D grid 📏 of tiles with emojis 😎🦄🍕 aiming for domination 💪.

### Systems 🖥

The goal 🎯 of Emoji Wars is for new systems 🔄 to be implemented frequently 🔄 and world resets 🔄 to happen often. Everything is transparent 🌈 and anyone 🙋‍♂️🙋‍♀️ can publish a system into the world 🌍.

There's only 1️⃣ enshrined system, and that's the emoji placement 📍 and the grids 📊.

### Season 1 🎬

- When you place an emoji 😊, you convert the tiles around you to your emoji if they exist 🔄.
- There's a 5️⃣ minute ⏰ timer between placing different emoji types 🔄.

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