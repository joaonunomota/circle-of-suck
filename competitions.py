import argparse
import sys
import json
import os
import requests

URL = "https://api.football-data.org/v4/competitions/{}/matches?status=FINISHED&season={}"

def update_fixtures(competition, season, token, path, verbose):
    endpoint = URL.format(competition, season)
    headers = {"X-Auth-Token": token}

    response = requests.get(endpoint, headers=headers)
    if response.status_code == 200:
        if (verbose):
            print("Debug: API returns 200.")

        json_data = response.json()
        simplified_data = {
            "id": competition,
            "name": json_data["competition"]["name"],
            "season": season,
            "teams": [],
            "fixtures": []
        }

        unique_teams = set()
        for match in json_data["matches"]:
            home_team = match["homeTeam"]
            away_team = match["awayTeam"]

            if home_team["id"] not in unique_teams:
                unique_teams.add(home_team["id"])
                home_mapping = {
                    "id": home_team["id"],
                    "shortName": home_team["shortName"],
                    "tla": home_team["tla"]
                }
                simplified_data["teams"].append(home_mapping)

            if away_team["id"] not in unique_teams:
                unique_teams.add(away_team["id"])
                away_team = {
                    "id": away_team["id"],
                    "shortName": away_team["shortName"],
                    "tla": away_team["tla"]
                }
                simplified_data["teams"].append(away_team)

            simplified_match = {
                "awayScore": match["score"]["fullTime"]["away"],
                "awayTeam": away_team["id"],
                "homeScore": match["score"]["fullTime"]["home"],
                "homeTeam": home_team["id"],
            }
            simplified_data["fixtures"].append(simplified_match)

        filename = f"{competition}-{season}.json"
        file_path = os.path.join(path, filename)

        with open(file_path, "w", encoding="UTF-8") as file:
            json.dump(simplified_data, file)

        return True
    else:
        if (verbose):
            print("Debug: API returns " + str(response.status_code))
            print(response.json())

        return False

def generate_index_file(path):
    competitions = []
    seasons = {}

    unique_competitions = set()

    for file_name in os.listdir(path):
        if file_name.endswith(".json"):
            with open(os.path.join(path, file_name), "r", encoding="UTF-8") as file:
                data = json.load(file)
                competition_id = data["id"]
                competition_name = data["name"]
                competition_season = data["season"]

                if competition_id not in unique_competitions:
                    unique_competitions.add(competition_id)

                    if competition_id not in seasons:
                        seasons[competition_id] = []

                    competition = {
                        "value": competition_id,
                        "name": competition_name
                    }
                    competitions.append(competition)

                seasons[competition_id].append(competition_season)

    index_file_path = os.path.join(path, "index.ts")
    with open(index_file_path, "w", encoding="UTF-8") as index_file:
        index_file.write('import type { Option } from "../types";\n\n')
        index_file.write('export const competitions: Option<number>[] = ')
        json.dump(competitions, index_file, indent=2)
        index_file.write(';\n\n')
        index_file.write('export const seasons: Record<number, number[]> = ')
        json.dump(seasons, index_file, indent=2)
        index_file.write(';\n')

    return True

parser = argparse.ArgumentParser()
parser.add_argument("command", choices=["update", "help", "index"], help="the command to execute")
parser.add_argument("-c", "--competition", type=int, help="the competition id")
parser.add_argument("-s", "--season", type=int, help="the season start year")
parser.add_argument("-t", "--token", type=str, default=os.getenv("FOOTBALL_DATA_TOKEN"), help="the api token")
parser.add_argument("-p", "--path", type=str, default="", help="the output path")
parser.add_argument("-v", "--verbose", action="store_true", help="include debug logs")
args = parser.parse_args()

if args.command == "update":
    if args.competition is None or args.season is None or args.path is None:
        print("Error: Missing required arguments.")
        parser.print_help()
        sys.exit(1)

    if args.token is None or args.token == "":
        print("Error: Missing or invalid token.")
        parser.print_help()
        sys.exit(1)

    SUCCESS = update_fixtures(args.competition, args.season, args.token, args.path, args.verbose)
    if SUCCESS:
        print("Info: Success")
        sys.exit(0)
    else:
        print("Info: Failure")
        sys.exit(1)

elif args.command == "index":
    if args.path is None:
        print("Error: Missing required argument.")
        parser.print_help()
        sys.exit(1)
    
    SUCCESS = generate_index_file(args.path)
    if SUCCESS:
        print("Info: Success")
        sys.exit(0)
    else:
        print("Info: Failure")
        sys.exit(1)

elif args.command == "help":
    parser.print_help()
    sys.exit(0)

else:
    print("Error: Invalid command.")
    parser.print_help()
    sys.exit(1)