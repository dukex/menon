import re
import os
import unicodedata
import csv
from pyyoutube import Client

from dagster import (
    asset,
    AssetExecutionContext,
    AutoMaterializePolicy,
    AutoMaterializeRule,
    op,
)


client = Client(api_key=os.getenv("YOUTUBE_API_KEY"))


def generate_slug(name):
    value = (
        unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode("ascii")
    )
    value = re.sub(r"[^\w\s-]", "", value).strip().lower()
    return re.sub(r"[-\s]+", "-", value)


@asset()
def courses():
    with open("courses/index.csv") as file:
        return [course for course in csv.DictReader(file, delimiter=",")]


@op()
def course_should_be_updated(course):
    return True


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    ),
)
def filter_courses(context: AssetExecutionContext, courses):
    return [course for course in courses if course_should_be_updated(course)]


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    ),
)
def fetch_lessons(context: AssetExecutionContext, filter_courses):
    _courses = filter_courses

    for course in _courses:
        res = client.playlistItems.list(
            max_results=50, playlist_id=course["source_url"].split("list=")[1]
        )

        course["lessons"] = []

        if res.items:
            for item in res.items:
                course["lessons"].append(item.snippet)

    return _courses


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    ),
)
def enrich_courses(context: AssetExecutionContext, filter_courses):
    _courses = filter_courses

    for course in _courses:
        res = client.playlists.list(
            max_results=1, playlist_id=course["source_url"].split("list=")[1]
        )
        if res.items:
            playlist = res.items[0].snippet

            course["slug"] = generate_slug(course["name"])

            if len(course["description"]) < 1:
                course["description"] = playlist.description

            course["published_at"] = playlist.publishedAt
            course["thumbnail_url"] = [
                thumbnail.url
                for thumbnail in [
                    playlist.thumbnails.maxres,
                    playlist.thumbnails.high,
                    playlist.thumbnails.default,
                ]
                if thumbnail
            ][0]

            if len(course["language"]) < 1:
                course["language"] = playlist.defaultLanguage

    return _courses


@op()
def group_by_source_url(courses):
    by_url = {}

    for course in courses:
        by_url[course["source_url"]] = course

    return by_url


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    )
)
def merge_courses_with_enrichment(
    context: AssetExecutionContext, courses, enrich_courses
):
    new_courses = []
    by_url = group_by_source_url(enrich_courses)

    for course in courses:
        enriched = (
            by_url[course["source_url"]] if course["source_url"] in by_url else False
        )

        if enriched:
            new_courses.append(enriched)
        else:
            new_courses.append(course)

    return new_courses


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    )
)
def save_courses(context: AssetExecutionContext, merge_courses_with_enrichment):
    with open("courses/index.csv", "w", newline="\n", encoding="utf-8") as f:
        headers = [
            "name",
            "source_url",
            "description",
            "creator_name",
            "creator_url",
            "published_at",
            "thumbnail_url",
            "slug",
            "provider",
            "language",
            "category",
            "id",
            "status",
        ]
        writer = csv.DictWriter(f, fieldnames=headers)

        writer.writeheader()

        for course in merge_courses_with_enrichment:
            writer.writerow(course)

    return None


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    )
)
def save_lessons(
    context: AssetExecutionContext, fetch_lessons, merge_courses_with_enrichment
):
    by_url = group_by_source_url(merge_courses_with_enrichment)

    for with_lessons_course in fetch_lessons:
        course = by_url[with_lessons_course["source_url"]]

        os.makedirs(f"courses/{course["slug"]}/lessons", exist_ok=True)

        with open(
            f"courses/{course["slug"]}/lessons/index.csv",
            "w",
            newline="\n",
            encoding="utf-8",
        ) as f:
            headers = ["title", "description", "published_at", "provider_id"]
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()

            for lesson in with_lessons_course["lessons"]:
                writer.writerow({
                    "title": lesson.title,
                    "description": lesson.description,
                    "published_at": lesson.publishedAt,
                    "provider_id": lesson.resourceId.videoId,
                })
