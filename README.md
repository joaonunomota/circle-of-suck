# Circle of Suck

Circle of Suck visualises the largest chain of negative scorelines for a given season of a competition.

## Development

### Requirements

- python 3.11

### Project Setup

1. Clone and change to the directory:

   ```
   git clone https://github.com/joaonunomota/circle-of-suck.git
   cd circle-of-suck
   ```

2. Create and activate a virtual environment:

   Unix based systems: 
   ```
   virtualenv env
   source env/bin/activate
   ```
   Windows: 
   ```
   py -m venv env
   .\env\Scripts\activate
   ```
   
3. Install Python and Node requirements:

   ```sh
   pip install -r requirements.txt
   ```

   ```sh
   npm install
   ```

4. Add data from football-data.org:

   Fetch data for the desired competitions and seasons.

   ```sh
   python competitions.py update -c <competition> -s <season> -p <path> -t <token>
   ```

   Generate an index file once all the data is fetched.

   ```sh
   python competitions.py index -p <path>
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
