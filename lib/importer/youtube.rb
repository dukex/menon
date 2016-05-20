module Importer
  class Base
    attr_reader :course, :source_url, :provider

    def initialize(source_url, owner_id, provider)
       @course = Course.new owner_id: owner_id, source_url: source_url
       @source_url = source_url
       @provider = provider
    end
  end

  class Youtube < Base
    def initialize(source_url, owner_id, provider = Yt::Playlist)
      super
    end

    def import!
      playlist = provider.new url: source_url

      course.assign_attributes name: playlist.title,
                               description: playlist.description

      lessons = playlist.playlist_items.map do |item|
        YoutubeLesson.new name: item.title,
                          description: item.description,
                          thumbnail_url: build_thumbail_url(item.video),
                          published_at: item.published_at,
                          provider_id: item.video.id,
                          position: item.position,
                          duration: item.video.duration,
                          course_id: course.id
      end

      course.lessons = lessons
      course.save
    rescue Yt::Error => error
      course.errors.add(:base, error.kind["message"])
     ensure
       return course
    end

    private

    def build_thumbail_url(video)
      "http://img.youtube.com/vi/#{video.id}/hqdefault.jpg"
    end
  end
end
