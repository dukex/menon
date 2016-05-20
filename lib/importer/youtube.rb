module Importer
  class Base
    attr_accessor :course, :source_url, :provider

    def initialize(source_url, owner_id, provider)
       @course = Course.new owner_id: owner_id, source_url: source_url
       @source_url = source_url
       @provider = provider
    end

    def self.update!(id)
      course = Course.find id
      importer = self.new course.source_url, course.owner_id
      importer.course = course
      importer.source_url = course.source_url
      importer.import!
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
        YoutubeLesson.find_or_create_by(provider_id: item.video.id) do |lesson|
          lesson.name = item.title
          lesson.description = item.description
          lesson.thumbnail_url = build_thumbail_url(item.video)
          lesson.published_at = item.published_at
          lesson.position = item.position
          lesson.duration = item.video.duration
          lesson.course_id = course.id
        end
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
