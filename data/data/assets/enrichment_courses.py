from dagster import asset, op, AutoMaterializePolicy, AutoMaterializeRule
from data.providers.youtube_playlist import YoutubePlaylistProvider
from data.helpers import generate_slug


@op()
def group_by_source_url(courses):
    by_url = {}

    for course in courses:
        by_url[course["source_url"]] = course

    return by_url


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    ),
)
def enriched_courses(courses_to_be_updated):
    courses = courses_to_be_updated

    for course in courses:
        course["slug"] = generate_slug(course["name"])
        if course["provider"] == "youtube_playlist":
            provider = YoutubePlaylistProvider()

            playlist = provider.get_playlist_info(course)

            course["description"] = (
                playlist.description
                if len(course["description"]) < 1
                else course["description"]
            )
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

    return courses


@asset(
    auto_materialize_policy=AutoMaterializePolicy.eager().with_rules(
        AutoMaterializeRule.materialize_on_parent_updated(),
    )
)
def enriched_courses_merged(courses, enriched_courses):
    new_courses = []
    by_url = group_by_source_url(enriched_courses)

    for course in courses:
        enriched = (
            by_url[course["source_url"]] if course["source_url"] in by_url else False
        )

        if enriched:
            new_courses.append(enriched)
        else:
            new_courses.append(course)

    return new_courses
