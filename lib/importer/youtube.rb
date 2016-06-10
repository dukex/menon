module Importer
  class Base
    attr_accessor :course, :source_url, :provider

    def self.update!(course_id, provider = nil)
      course = Course.find course_id
      importer = new(course.source_url, course.owner_id, provider)
      importer.import!
    end

    def initialize(source_url, owner_id, provider = nil)
       @course = find_course source_url, owner_id
       @source_url = source_url
       @provider = provider || default_provider
    end

    private

    def find_course(source_url, owner_id)
      Course.where(owner_id: owner_id, source_url: source_url).first_or_initialize
    end

    def default_provider
      nil
    end
  end

  class Youtube < Base
    def import!
      playlist = provider.new url: source_url

      puts "- Importing '#{playlist.title}'"

      course.name = playlist.title
      course.description = playlist.description
      course.thumbnail_url = build_thumbail_url playlist.playlist_items.first.video
      course.save

      puts "-- Found #{playlist.playlist_items.count} episodes"

      lessons = playlist.playlist_items.map do |item|
        puts "-- - Importing #{item.title}"
        YoutubeLesson.find_or_create_by(provider_id: item.video.id, course_id: course.id) do |lesson|
          lesson.name = item.title
          lesson.description = item.description
          lesson.thumbnail_url = build_thumbail_url(item.video)
          lesson.published_at = item.published_at
          lesson.position = item.position
          lesson.duration = item.video.duration
        end
      end

    rescue Yt::Error => error
      course.errors.add(:base, error.kind["message"])
    ensure
      return course
    end

    private

    def default_provider
      Yt::Playlist
    end

    def build_thumbail_url(video)
      "http://img.youtube.com/vi/#{video.id}/hqdefault.jpg"
    end
  end
end
