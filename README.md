# Circle of Suck

Circle of Suck visualises the largest chain of negative scorelines for a given season of a competition.

## Development

### Requirements

- python 3.11

### Project Setup

1. Clone and change to the directory:

   ```sh
   git clone https://github.com/joaonunomota/circle-of-suck.git
   cd circle-of-suck
   ```

2. Create and activate a virtual environment:

   Unix based systems: 
   ```sh
   virtualenv env
   source env/bin/activate
   ```
   Windows: 
   ```sh
   python -m venv env
   source env/Scripts/activate
   ```
   
3. Install Python and Node requirements:

   ```sh
   pip install -r requirements.txt
   ```

   ```sh
   npm install
   ```

4. Add data from football-data.org:

   ```sh
   python competitions.py -c <competition> -y <year> -p <path> -t <token>
   ```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
