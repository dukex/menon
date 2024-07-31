from pyyoutube import Client
import os

client = Client(api_key=os.getenv("YOUTUBE_API_KEY"))


class YoutubePlaylistProvider:
    def get_playlist_info(self, course):
        playlist_id = course["source_url"].split("list=")[1]
        res = client.playlists.list(max_results=1, playlist_id=playlist_id)

        if res.items:
            return res.items[0].snippet

        raise BaseException()

    def get_playlist_items(self, playlist_id):
        items = []
        page_token = None

        while True:
            page_token, new_items = self._get_playlist_items(playlist_id, page_token)

            items.extend(new_items)

            if page_token is None:
                break

        return items

    def _get_playlist_items(self, playlist_id, page_token):
        res = client.playlistItems.list(
            max_results=50,
            playlist_id=playlist_id,
            page_token=page_token,
            return_json=True,
        )

        return [res.get("nextPageToken"), res["items"]]
