import os
from dagster import (
    asset,
    AutoMaterializePolicy,
    AutoMaterializeRule,
)
from pyyoutube.client import json


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    )
)
def save_lessons(courses_with_lessons):
    for course in courses_with_lessons:
        os.makedirs(f"courses/{course["slug"]}", exist_ok=True)

        with open(
            f"courses/{course["slug"]}/lessons.json",
            "w",
            newline="\n",
            encoding="utf-8",
        ) as f:
            json.dump(course["lessons"], f, indent=2, sort_keys=True)

    return None
