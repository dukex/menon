from dagster import asset, AutoMaterializePolicy, AutoMaterializeRule

import os

from pyyoutube.client import json


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    )
)
def save_courses(enriched_courses_merged):
    os.makedirs("courses", exist_ok=True)

    with open("courses/index.json", "w", newline="\n", encoding="utf-8") as f:
        json.dump(enriched_courses_merged, f, indent=2, sort_keys=True)

    return None
