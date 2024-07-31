from dagster import (
    asset,
    AutoMaterializePolicy,
    AutoMaterializeRule,
)

from data.providers.youtube_playlist import YoutubePlaylistProvider
from data.helpers import generate_slug


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    ),
)
def courses_with_lessons(enriched_courses):
    for course in enriched_courses:
        course["lessons"] = []
        if course["provider"] == "youtube_playlist":
            provider = YoutubePlaylistProvider()

            playlist_id = course["source_url"].split("list=")[1]

            items = provider.get_playlist_items(playlist_id)
            for item in items:
                if item["status"]["privacyStatus"] != "private":
                    thumbnails = [
                        thumbnail["url"]
                        for thumbnail in [
                            item["snippet"]["thumbnails"].get("maxres"),
                            item["snippet"]["thumbnails"].get("high"),
                            item["snippet"]["thumbnails"].get("medium"),
                            item["snippet"]["thumbnails"].get("default"),
                        ]
                        if thumbnail
                    ]
                    course["lessons"].append({
                        "name": item["snippet"]["title"],
                        "description": item["snippet"]["description"],
                        "thumbnail_url": thumbnails[0],
                        "published_at": item["snippet"]["publishedAt"],
                        "provider_id": item["snippet"]["resourceId"]["videoId"],
                        "duration": 1,
                        "position": item["snippet"]["position"],
                        "course": course["slug"],
                        "slug": generate_slug(item["snippet"]["title"]),
                    })

    return enriched_courses
