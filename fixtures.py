import argparse
import json
import os
import requests
import sys

url = "https://api.football-data.org/v4/competitions/{}/matches?status=FINISHED&season={}"

def update_fixtures(competition, season, token, path):
    endpoint = url.format(competition, season)
    headers = {"X-Auth-Token": token}

    response = requests.get(endpoint, headers=headers)
    if response.status_code == 200:
        json_data = response.json()
        simplified_data = simplify_json(json_data)
        with open(path, "w") as file:
            json.dump(simplified_data, file)
        return True
    else:
        return False

def simplify_json(json_data):
    simplified_data = {
        "competition": {
            "id": json_data["competition"]["id"],
            "name": json_data["competition"]["name"]
        },
        "matches": []
    }

    for match in json_data["matches"]:
        simplified_match = {
            "awayTeam": {
                "shortName": match["awayTeam"]["shortName"],
                "tla": match["awayTeam"]["tla"]
            },
            "competition": {
                "id": match["competition"]["id"]
            },
            "homeTeam": {
                "shortName": match["homeTeam"]["shortName"],
                "tla": match["homeTeam"]["tla"]
            },
            "score": {
                "fullTime": match["score"].get("fullTime"),
            }
        }
        simplified_data["matches"].append(simplified_match)

    return simplified_data

parser = argparse.ArgumentParser()
parser.add_argument("-c", "--competition", type=int, required=True)
parser.add_argument("-s", "--season", type=int, required=True)
parser.add_argument("-t", "--token", type=str, default=os.getenv("FOOTBALL_DATA_TOKEN"))
parser.add_argument("-p", "--path", type=str, required=True)
args = parser.parse_args()

success = update_fixtures(args.competition, args.season, args.token, args.path)

if success:
    print("Success")
    sys.exit(0)
else:
    print("Failure")
    sys.exit(1)
